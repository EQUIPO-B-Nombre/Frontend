import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {UserApiService} from '../../../users/services/user.service';
import {DoctorService} from '../../../users/services/doctor.service';
import {PatientService} from '../../../users/services/patient.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginAttempts: number = 0;
  errorMessage: string | null = null;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationApiService: AuthenticationApiService,
    private userApiService: UserApiService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.userApiService.isLogged()) {
      this.redirectUser();
    }
  }

  login(): void {
    if (this.loginAttempts > 3) {
      this.errorMessage = 'Has alcanzado el límite de intentos de inicio de sesión. Por favor, inténtalo más tarde.';
      return;
    }

    this.loginAttempts++;

    const { email, password } = this.loginForm.value;

    this.authenticationApiService.signIn(email, password).subscribe(
      (response: any) => {
        this.userApiService.setLogged(true);
        this.userApiService.setUserId(response['id']);
        this.snackBar.open('Inicio de sesión exitoso 🤗', 'Cerrar', { duration: 2000 });
        this.doctorService.getAll().subscribe((data) => {
          const doctor = data.find((doctor) => doctor.userId === response['id']);
          if (doctor) {
            this.userApiService.setIsDoctor(true);
            if (doctor && doctor.id !== undefined) {this.doctorService.setDoctorId(doctor.id); }
            this.router.navigateByUrl('/doctor/home');
          } else {
            this.patientService.getAll().subscribe((data) => {
              const patient = data.find((patient) => patient.userId === response['id']);
              if (patient) {
                this.userApiService.setIsDoctor(false);
                if (patient && patient.id !== undefined) {this.patientService.setPatientId(patient.id); }
                this.router.navigateByUrl('/patient/home');
              }
            });
          }
        })

      },
      (error) => {
        this.snackBar.open('Error. Credenciales no encontradas 😥', 'Cerrar', { duration: 3000 });
      }
    );
  }

  public redirectSignUp(): void {
    this.router.navigateByUrl('/sign-up');
  }

  private redirectUser(): void {
    if (this.userApiService.getIsDoctor()) {
      this.router.navigateByUrl('/doctor/home');
    } else {
      this.router.navigateByUrl('/patient/home');
    }
  }
}
