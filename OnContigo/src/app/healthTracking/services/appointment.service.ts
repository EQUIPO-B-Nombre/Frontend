import {Injectable, Input, ViewChild} from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Appointment} from '../models/appointment.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment>{

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.appointmentURL;
  }

}
