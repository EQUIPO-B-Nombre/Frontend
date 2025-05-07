import { Component } from '@angular/core';
import {UserApiService} from '../../../users/services/user.service';
import {PatientService} from '../../../users/services/patient.service';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {ProfileService} from '../../../users/services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../users/models/profile.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StorageService} from '../../../shared/services/storage.service';




@Component({
  selector: 'app-register-patient',
  standalone: false,
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})

export class RegisterPatientComponent {

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      experience: new FormControl(0),
      description: new FormControl(''),
      dni: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),

    }
  );

  photo_d: any;

  constructor(
    private userApiService: UserApiService,
    private patientService: PatientService,
    private authenticationApiService: AuthenticationApiService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,

  ) {}

  removeImage(){
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onImagePicked(event: any){
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file.name;
      this.imagePreview = URL.createObjectURL(file);
      let reader= new FileReader();
      let name = "PROFILEPHOTO_IMAGE_" + Date.now();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        try {
          this.storageService.uploadFile(name, reader.result)
            .then((url) => {
              console.log('Archivo subido exitosamente:', url);
              this.photo_d = url;
              console.log('This photo: ', this.photo_d);
            })
            .catch((error) => {
              console.error('Error al subir el archivo:', error);
              // Aquí puedes mostrar un mensaje al usuario o realizar alguna acción de recuperación
            });
        } catch (error) {
          console.error('Error inesperado durante la carga:', error);
        }

      }
    }
  }

  onSubmit() {

    if (this.photo_d == null) {
      this.snackBar.open('Debe seleccionar una foto de perfil 📷', 'Cerrar', {
        duration: 2000
      });
      return;
    }

    this.authenticationApiService.clearToken();

    this.authenticationApiService.signUp(this.registerForm.value.email, this.registerForm.value.password, ['ROLE_USER', 'ROLE_PATIENT'])
      .subscribe((data: any) => {
        this.authenticationApiService.signIn(this.registerForm.value.email, this.registerForm.value.password)
          .subscribe((response: any) => {
            let userId = response['id'];
            this.userApiService.setUserId(userId);
            this.userApiService.setLogged(true);
            const patientProfile: Profile = {
              userId: userId,
              firstName: this.registerForm.value.firstname,
              lastName: this.registerForm.value.lastname,
              city: this.registerForm.value.city,
              country: this.registerForm.value.country,
              birthDate: this.registerForm.value.birthDate,
              description: this.registerForm.value.description,
              photo: this.photo_d,
              experience: this.registerForm.value.experience,
              dni: this.registerForm.value.dni,
              phone: this.registerForm.value.phone
            };



            this.profileService.create(patientProfile).subscribe(
              (response) => {
                this.snackBar.open('Bienvenido ' + patientProfile.firstName + ' 🤗', 'Cerrar', {
                  duration: 2000
                });
              },
              error => {
                this.snackBar.open('Error al crear el perfil. Por favor, inténtalo de nuevo.', 'Cerrar', {
                  duration: 3000,
                  panelClass: ['error-snackbar']
                });
                console.error(error);
              }
            );
          });
      });
  }

  goBack() {
    window.history.back();
  }

}
