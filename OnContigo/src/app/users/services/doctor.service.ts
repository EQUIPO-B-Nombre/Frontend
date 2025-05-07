import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService<Doctor> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.doctorURL;
  }

  setDoctorId(advisor_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('doctor_id', advisor_id.toString());
    }
  }

  getDoctorId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const doctor_id = localStorage.getItem('doctor_id');
      return doctor_id ? parseInt(doctor_id) : 0;
    }
    return 0;
  }

}
