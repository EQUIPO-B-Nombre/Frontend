import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './iam/pages/login/login.component';
import { SignupComponent } from './iam/pages/signup/signup.component';
import { SignupPatientComponent } from './iam/pages/signup-patient/signup-patient.component';
import { SignupDoctorComponent } from './iam/pages/signup-doctor/signup-doctor.component';
import {HomeDoctorComponent} from './public/pages/home-doctor/home-doctor.component';
import {HomePatientComponent} from './public/pages/home-patient/home-patient.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-up/patient', component: SignupPatientComponent},
  {path: 'sign-up/doctor', component: SignupDoctorComponent},
  {path: 'doctor/home', component: HomeDoctorComponent},
  {path: 'patient/home', component: HomePatientComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
