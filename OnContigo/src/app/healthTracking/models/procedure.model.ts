export class Procedure {
  id?: number;
  name: string;
  description: string;
  performedAt: Date;
  healthTrackingId: number;

  constructor(
    name: string,
    description: string,
    performedAt: Date,
    healthTrackingId: number,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.performedAt = performedAt;
    this.healthTrackingId = healthTrackingId;
  }


}
