import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoginComponent } from './iam/pages/login/login.component';
import { RegisterUserComponent } from './iam/components/register-user/register-user.component';
import { RegisterDoctorComponent } from './iam/components/register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './iam/components/register-patient/register-patient.component';
import { SignupComponent } from './iam/pages/signup/signup.component';
import { SignupPatientComponent } from './iam/pages/signup-patient/signup-patient.component';
import { SignupDoctorComponent } from './iam/pages/signup-doctor/signup-doctor.component';
import { SidenavComponent } from './public/components/sidenav/sidenav.component';
import { HomeDoctorComponent } from './public/pages/home-doctor/home-doctor.component';
import { HomePatientComponent } from './public/pages/home-patient/home-patient.component';
import { HeaderComponent } from './public/components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterDoctorComponent,
    RegisterPatientComponent,
    SignupComponent,
    SignupPatientComponent,
    SignupDoctorComponent,
    SidenavComponent,
    HomeDoctorComponent,
    HomePatientComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
