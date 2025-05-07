import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Patient } from '../models/patient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseService<Patient> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.patientURL; // Configura la URL específica para pacientes
  }

  setPatientId(patient_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('patient_id', patient_id.toString());
    }
  }
  getPatientId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const patient_id = localStorage.getItem('patient_id');
      return patient_id ? parseInt(patient_id) : 0;
    }
    return 0;
  }

}
