export class HealthTracking {
  id?: number;
  status: string;
  description: string;
  lastVisit: Date;
  patientId: number;
  doctorId: number;

  constructor(
    status: string,
    description: string,
    lastVisit: Date,
    patientId: number,
    doctorId: number,
    id?: number
  ) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.lastVisit = lastVisit;
    this.patientId = patientId;
    this.doctorId = doctorId;
  }


}
