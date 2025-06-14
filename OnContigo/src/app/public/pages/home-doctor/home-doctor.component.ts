import { Component, type OnInit } from "@angular/core"
import { CommonModule} from '@angular/common';
import { RouterModule } from "@angular/router";
import {Doctor} from '../../../users/models/doctor.model';
import {Profile} from '../../../users/models/profile.model';
import {DoctorService} from '../../../users/services/doctor.service';
import {ProfileService} from '../../../users/services/profile.service';
import {UserApiService} from '../../../users/services/user.service';


@Component({
  selector: "app-home-doctor",
  templateUrl: "./home-doctor.component.html",
  styleUrls: ["./home-doctor.component.css"],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HomeDoctorComponent implements OnInit {
  doctorName = ""
  doctorProfileImage = "assets/images/doctor-profile.png"
  isLoading = true
  doctor: Doctor | null = null
  profile: Profile | null = null

  constructor(
    private doctorService: DoctorService,
    private profileService: ProfileService,
    private userApiService: UserApiService,
  ) {}

  ngOnInit(): void {
    this.loadDoctorData()
  }

  private loadDoctorData(): void {
    const userId = this.userApiService.getUserId()

    if (userId) {
      // Cargar perfil del doctor
      this.profileService.getProfileByUserId(userId).subscribe({
        next: (profile) => {
          this.profile = profile
          this.doctorName = `${profile.firstName} ${profile.lastName}`
          if (profile.photo) {
            this.doctorProfileImage = profile.photo
          }
          this.isLoading = false
        },
        error: (error) => {
          console.error("Error loading doctor profile:", error)
          this.isLoading = false
        },
      })

      // Cargar datos del doctor
      this.doctorService.getAll().subscribe({
        next: (doctors) => {
          this.doctor = doctors.find((d) => d.userId === userId) || null
          if (this.doctor) {
            this.doctorService.setDoctorId(this.doctor.id!)
          }
        },
        error: (error) => {
          console.error("Error loading doctor data:", error)
        },
      })
    }
  }

  navigateToPatientList(): void {
    console.log("Navegando a lista de pacientes")
  }

  navigateToCalendar(): void {
    console.log("Navegando al calendario")
  }
}


