export class Treatment {
  id?: number
  patientId: number
  doctorId: number
  name: string
  description?: string
  startDate: Date
  endDate?: Date
  status: string
  createdAt?: Date
  updatedAt?: Date

  constructor(
    patientId: number,
    doctorId: number,
    name: string,
    startDate: Date,
    status = "active",
    description?: string,
    endDate?: Date,
    id?: number,
  ) {
    this.id = id
    this.patientId = patientId
    this.doctorId = doctorId
    this.name = name
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
    this.status = status
  }
}

