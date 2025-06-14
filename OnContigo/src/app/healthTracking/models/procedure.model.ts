export class Procedure {
  id?: number
  patientId: number
  doctorId: number
  name: string
  description?: string
  date: Date
  status: string
  results?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(
    patientId: number,
    doctorId: number,
    name: string,
    date: Date,
    status = "scheduled",
    description?: string,
    results?: string,
    id?: number,
  ) {
    this.id = id
    this.patientId = patientId
    this.doctorId = doctorId
    this.name = name
    this.description = description
    this.date = date
    this.status = status
    this.results = results
  }
}

