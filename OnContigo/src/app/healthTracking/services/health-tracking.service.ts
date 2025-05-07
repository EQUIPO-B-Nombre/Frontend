import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HealthTracking} from '../models/health-tracking.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthTrackingService extends BaseService<HealthTracking>{

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.healthTrackingURL;
  }
}
