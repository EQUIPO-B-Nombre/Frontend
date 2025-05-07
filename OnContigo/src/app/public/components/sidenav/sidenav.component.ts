import {Component, Input, ViewChild} from '@angular/core';
import {UserApiService} from '../../../users/services/user.service';
import {MatDrawer} from '@angular/material/sidenav';
import {DoctorService} from '../../../users/services/doctor.service';
import {PatientService} from '../../../users/services/patient.service';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  isOpen = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  onToggleSidenav(isOpen: boolean) {
    isOpen ? this.drawer.open() : this.drawer.close();
  }

  getIconForButton(button: string): string {
    const icons: {[key: string]: string} = {
      'Inicio': 'home',
      'Mis Pacientes': 'group',
      'Calendario': 'calendar_today',
      'Perfil': 'person',
      'Mi Doctor': 'medical_services',
      'Planes': 'assignment'
    };
    return icons[button] || 'help';
  }

  closeDrawer() {
    this.isOpen = false;
  }

  @Input() isDoctor: boolean;

  constructor(private userApiService: UserApiService,
              private doctorService: DoctorService,
              private patientService: PatientService) {

    this.isDoctor = this.userApiService.getIsDoctor();
  }

  getSidebarButtons(): string[] {
    this.isDoctor = this.userApiService.getIsDoctor();
    if (this.isDoctor) {
      return ["Inicio", "Mis Pacientes", "Calendario", "Perfil"];
    } else {
      return ["Inicio", "Calendario", "Mi Doctor", "Planes", "Perfil"];
    }
  }

  getButtonRoute(button: string): string {
    const doctorRoutes: { [key: string]: string } = {
      "Inicio": "doctor/home",
      "Pacientes": "doctor/list-patients",
      "Calendario": "doctor/calendar",
      "Perfil": "doctor/profile",
    };

    const patientRoutes: { [key: string]: string } = {
      "Inicio": "patient/home",
      "Informacion": "patient/information",
      "Calendario": "patient/calendar",
      "Planes": "patient/plans",
      "Mi doctor": "patient/my-doctor",
      "Perfil": "patient/profile",
    };

    this.isDoctor = this.userApiService.getIsDoctor();

    const routes = this.isDoctor ? doctorRoutes : patientRoutes;
    return routes[button] || "/";
  }

  logOut() {
    this.userApiService.setLogged(false);
    this.userApiService.setUserId(0);
    this.userApiService.clearToken();
    this.doctorService.setDoctorId(0);
    this.patientService.setPatientId(0);
    this.onToggleSidenav(false);
    this.isOpen = false;
  }
}
