import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './iam/pages/login/login.component';
import { SignupComponent } from './iam/pages/signup/signup.component';
import { SignupPatientComponent } from './iam/pages/signup-patient/signup-patient.component';
import { SignupDoctorComponent } from './iam/pages/signup-doctor/signup-doctor.component';
import {HomeDoctorComponent} from './public/pages/home-doctor/home-doctor.component';
import {HomePatientComponent} from './public/pages/home-patient/home-patient.component';
import {PatientsDoctorComponent} from './public/pages/patients-doctor/patients-doctor.component';
import {CalendarDoctorComponent} from './public/pages/calendar-doctor/calendar-doctor.component';
// Guard para proteger rutas (opcional)
import { AuthGuard } from './shared/guards/auth.guard';
import {CalendarPatientComponent} from './public/pages/calendar-patient/calendar-patient.component';
import {PatientTreatmentsComponent} from './public/components/patient-treatments/patient-treatments.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-up/patient', component: SignupPatientComponent },
  { path: 'sign-up/doctor', component: SignupDoctorComponent },

  // Rutas del Doctor
  {
    path: 'doctor',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeDoctorComponent },
      { path: 'patients', component: PatientsDoctorComponent },
      { path: 'calendar', component: CalendarDoctorComponent },
      // Agregar más rutas de doctor aquí cuando las tengas
      // { path: 'profile', component: DoctorProfileComponent },
    ]
  },

  // Rutas del Paciente
  {
    path: 'patient',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePatientComponent },
      { path: 'calendar', component: CalendarPatientComponent },
      { path: 'treatments', component: PatientTreatmentsComponent },
      // Agregar más rutas de paciente aquí cuando las tengas
      // { path: 'my-doctor', component: MyDoctorComponent },
      // { path: 'medications', component: PatientMedicationsComponent },
      // { path: 'profile', component: PatientProfileComponent },
    ]
  },

  // Ruta wildcard - debe ser la última
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Habilitar tracing para debug (remover en producción)
    enableTracing: false,
    // Configuración adicional
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
