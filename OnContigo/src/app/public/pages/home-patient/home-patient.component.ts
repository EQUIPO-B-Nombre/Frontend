import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../../users/services/user.service';
import { ProfileService } from '../../../users/services/profile.service';
import { PatientService } from '../../../users/services/patient.service';
import { Profile } from '../../../users/models/profile.model';

@Component({
  selector: 'app-home-patient',
  standalone: false,
  templateUrl: './home-patient.component.html',
  styleUrl: './home-patient.component.css'
})
export class HomePatientComponent implements OnInit {
  patientName = "Paciente";
  patientProfileImage = "assets/images/patient-profile.png";
  profile: Profile | null = null;
  upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. García",
      date: "15 Jul 2025",
      time: "10:30",
      type: "Consulta General"
    },
    {
      id: 2,
      doctorName: "Dr. López",
      date: "20 Jul 2025",
      time: "14:00",
      type: "Seguimiento"
    }
  ];

  healthMetrics = {
    lastVisit: "10 Jul 2025",
    nextAppointment: "15 Jul 2025",
    activeTreatments: 2,
    medications: 3
  };

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private profileService: ProfileService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadPatientProfile();
  }

  loadPatientProfile(): void {
    const userId = this.userApiService.getUserId();
    if (userId) {
      this.profileService.getProfileByUserId(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.patientName = `${profile.firstName} ${profile.lastName}`;
          if (profile.photo) {
            this.patientProfileImage = profile.photo;
          }
        },
        error: (error) => {
          console.error('Error loading patient profile:', error);
        }
      });
    }
  }

  navigateToCalendar(): void {
    this.router.navigate(['/patient/calendar']);
  }

  navigateToMyDoctor(): void {
    this.router.navigate(['/patient/my-doctor']);
  }

  navigateToTreatments(): void {
    this.router.navigate(['/patient/treatments']);
  }

  navigateToMedications(): void {
    this.router.navigate(['/patient/medications']);
  }
}
