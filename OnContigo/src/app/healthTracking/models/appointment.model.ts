export class Appointment {
  id?: number;
  healthTrackingId: number;
  dateTime: Date;
  description?: string;

  constructor(
    healthTrackingId: number,
    dateTime: Date,
    description?: string,
    id?: number
  ) {
    this.id = id;
    this.healthTrackingId = healthTrackingId;
    this.dateTime = dateTime;
    this.description = description;
  }


}
