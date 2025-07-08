import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../../../users/services/user.service';
import { ProfileService } from '../../../users/services/profile.service';
import { DoctorService } from '../../../users/services/doctor.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Profile } from '../../../users/models/profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: false,
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {
  profile: Profile | null = null;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    experience: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
  });

  // Estadísticas del doctor (simuladas)
  doctorStats = {
    totalPatients: 0,
    activePatients: 0,
    completedTreatments: 0,
    upcomingAppointments: 0,
    yearsExperience: 0,
    specializations: ['Medicina General'],
    rating: 4.8,
    totalReviews: 156
  };

  constructor(
    private userApiService: UserApiService,
    private profileService: ProfileService,
    private doctorService: DoctorService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctorProfile();
    this.loadDoctorStats();
  }

  loadDoctorProfile(): void {
    const userId = this.userApiService.getUserId();
    if (userId) {
      this.profileService.getProfileByUserId(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.populateForm(profile);
          if (profile.photo) {
            this.imagePreview = profile.photo;
          }
        },
        error: (error) => {
          console.error('Error loading doctor profile:', error);
          this.snackBar.open('Error al cargar el perfil', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  loadDoctorStats(): void {
    // En una aplicación real, estos datos vendrían de servicios
    // Por ahora simulamos datos basados en el perfil
    if (this.profile) {
      this.doctorStats = {
        totalPatients: 45,
        activePatients: 32,
        completedTreatments: 128,
        upcomingAppointments: 12,
        yearsExperience: this.profile.experience || 0,
        specializations: ['Cardiología', 'Medicina Interna'],
        rating: 4.8,
        totalReviews: 156
      };
    }
  }

  populateForm(profile: Profile): void {
    this.profileForm.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      dni: profile.dni,
      city: profile.city,
      country: profile.country,
      birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : '',
      experience: profile.experience || 0,
      description: profile.description || ''
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Si cancela la edición, restaurar valores originales
      if (this.profile) {
        this.populateForm(this.profile);
        this.imagePreview = this.profile.photo || null;
        this.selectedFile = null;
      }
    }
  }

  onImagePicked(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  async saveProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (!this.profile) return;

    try {
      let photoUrl: string | undefined = this.profile.photo;

      // Subir nueva imagen si se seleccionó una
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onloadend = async () => {
          try {
            const name = "DOCTOR_PROFILE_" + Date.now();
            const uploadedUrl = await this.storageService.uploadFile(name, reader.result);
            photoUrl = uploadedUrl || undefined;
            await this.updateProfileData(photoUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
            this.snackBar.open('Error al subir la imagen', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        };
      } else {
        await this.updateProfileData(photoUrl);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      this.snackBar.open('Error al guardar el perfil', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  private async updateProfileData(photoUrl: string | undefined): Promise<void> {
    if (!this.profile) return;

    const updatedProfile: Profile = {
      ...this.profile,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      phone: this.profileForm.value.phone,
      dni: this.profileForm.value.dni,
      city: this.profileForm.value.city,
      country: this.profileForm.value.country,
      birthDate: new Date(this.profileForm.value.birthDate),
      experience: this.profileForm.value.experience,
      description: this.profileForm.value.description,
      photo: photoUrl
    };

    this.profileService.update(this.profile.id!, updatedProfile).subscribe({
      next: (response) => {
        this.profile = response;
        this.isEditing = false;
        this.snackBar.open('Perfil actualizado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadDoctorStats(); // Recargar estadísticas
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Error al actualizar el perfil', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  logout(): void {
    this.userApiService.setLogged(false);
    this.userApiService.setUserId(0);
    this.userApiService.clearToken();
    this.doctorService.setDoctorId(0);
    this.router.navigate(['/login']);
    this.snackBar.open('Sesión cerrada exitosamente', 'Cerrar', {
      duration: 2000
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}
