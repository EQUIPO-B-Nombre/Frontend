import { Component, type OnInit } from "@angular/core"
import { Router } from '@angular/router';
import { UserApiService } from '../../../users/services/user.service';
import { ProfileService } from '../../../users/services/profile.service';
import { DoctorService } from '../../../users/services/doctor.service';
import { Profile } from '../../../users/models/profile.model';

@Component({
  selector: "app-home-doctor",
  templateUrl: "./home-doctor.component.html",
  styleUrls: ["./home-doctor.component.css"],
  standalone: false
})
export class HomeDoctorComponent implements OnInit {
  doctorName = "Doctor";
  doctorProfileImage = "assets/images/doctor-profile.png";
  profile: Profile | null = null;

  // Datos simulados para las métricas del dashboard
  dashboardMetrics = {
    totalPatients: 0,
    todayAppointments: 0,
    pendingAlerts: 0,
    activeTreatments: 0
  };

  todayAppointments = [
    {
      id: 1,
      patientName: "Juan Pérez",
      time: "09:00",
      type: "Consulta General",
      status: "confirmada"
    },
    {
      id: 2,
      patientName: "María García",
      time: "10:30",
      type: "Seguimiento",
      status: "confirmada"
    },
    {
      id: 3,
      patientName: "Carlos López",
      time: "14:00",
      type: "Urgencia",
      status: "pendiente"
    }
  ];

  recentAlerts = [
    {
      id: 1,
      patientName: "Ana Martínez",
      message: "Valores anómalos en última revisión",
      priority: "alta",
      time: "Hace 2 horas"
    },
    {
      id: 2,
      patientName: "Pedro Rodríguez",
      message: "Cita perdida - Reagendar",
      priority: "media",
      time: "Hace 4 horas"
    }
  ];

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private profileService: ProfileService,
    private doctorService: DoctorService
  ) {
  }

  ngOnInit(): void {
    this.loadDoctorProfile();
    this.loadDashboardData();
  }

  loadDoctorProfile(): void {
    const userId = this.userApiService.getUserId();
    if (userId) {
      this.profileService.getProfileByUserId(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.doctorName = `Dr. ${profile.firstName} ${profile.lastName}`;
          if (profile.photo) {
            this.doctorProfileImage = profile.photo;
          }
        },
        error: (error) => {
          console.error('Error loading doctor profile:', error);
        }
      });
    }
  }

  loadDashboardData(): void {
    // Simulamos la carga de datos del dashboard
    // En producción, estos datos vendrían de servicios reales
    this.dashboardMetrics = {
      totalPatients: 45,
      todayAppointments: this.todayAppointments.length,
      pendingAlerts: this.recentAlerts.length,
      activeTreatments: 23
    };
  }

  navigateToPatientList(): void {
    this.router.navigate(['/doctor/patients']);
  }

  navigateToCalendar(): void {
    this.router.navigate(['/doctor/calendar']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/doctor/profile']);
  }

  viewAppointmentDetails(appointmentId: number): void {
    console.log('Ver detalles de cita:', appointmentId);
    // Implementar navegación a detalles de cita
  }

  handleAlert(alertId: number): void {
    console.log('Manejar alerta:', alertId);
    // Implementar lógica para manejar alertas
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmada':
        return 'status-confirmed';
      case 'pendiente':
        return 'status-pending';
      case 'cancelada':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'alta':
        return 'priority-high';
      case 'media':
        return 'priority-medium';
      case 'baja':
        return 'priority-low';
      default:
        return '';
    }
  }
}
