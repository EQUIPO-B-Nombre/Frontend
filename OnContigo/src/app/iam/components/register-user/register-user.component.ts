import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  constructor(private router: Router) {
  }

  registerDoctor() {
    this.router.navigate(['/sign-up/patient']);
  }

  registerPatient() {
    this.router.navigate(['/sign-up/doctor']);
  }

}
