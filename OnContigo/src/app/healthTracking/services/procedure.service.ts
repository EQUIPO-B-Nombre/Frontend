import { Injectable } from '@angular/core';
import {Procedure} from '../models/procedure.model';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService extends BaseService<Procedure> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.procedureURL;
  }
}
