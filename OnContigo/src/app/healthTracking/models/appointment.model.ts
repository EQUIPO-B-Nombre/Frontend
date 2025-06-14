export class Appointment {
  id?: number
  patientId: number
  doctorId: number
  date: Date
  time: string
  status: string
  notes?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(
    patientId: number,
    doctorId: number,
    date: Date,
    time: string,
    status = "scheduled",
    notes?: string,
    id?: number,
  ) {
    this.id = id
    this.patientId = patientId
    this.doctorId = doctorId
    this.date = date
    this.time = time
    this.status = status
    this.notes = notes
  }
}
