import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Treatment} from '../models/treatment.model';



@Injectable({
  providedIn: 'root'
})
export class TreatmentService extends BaseService<Treatment> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.treatmentURL;
  }
}
