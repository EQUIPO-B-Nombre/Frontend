import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Prescription} from '../models/prescription.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends BaseService<Prescription>{

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.prescriptionURL;
  }
}
