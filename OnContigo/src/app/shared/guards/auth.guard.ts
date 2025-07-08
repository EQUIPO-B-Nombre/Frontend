import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserApiService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userApiService: UserApiService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userApiService.isLogged()) {
      // Verificar si el usuario está intentando acceder a rutas del tipo correcto
      const url = state.url;
      const isDoctor = this.userApiService.getIsDoctor();

      if (url.startsWith('/doctor') && !isDoctor) {
        // Usuario es paciente pero intenta acceder a rutas de doctor
        this.router.navigate(['/patient/home']);
        return false;
      }

      if (url.startsWith('/patient') && isDoctor) {
        // Usuario es doctor pero intenta acceder a rutas de paciente
        this.router.navigate(['/doctor/home']);
        return false;
      }

      return true;
    } else {
      // Usuario no está logueado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
