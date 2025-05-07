export class Treatment {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  healthTrackingId: number;

  constructor(
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    healthTrackingId: number,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.healthTrackingId = healthTrackingId;
  }


}
