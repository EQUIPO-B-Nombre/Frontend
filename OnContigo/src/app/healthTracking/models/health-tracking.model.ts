export class HealthTracking {
  id?: number
  patientId: number
  doctorId: number
  type: string // 'alarm', 'reminder', 'medication', etc.
  title: string
  description?: string
  scheduledTime: Date
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date

  constructor(
    patientId: number,
    doctorId: number,
    type: string,
    title: string,
    scheduledTime: Date,
    isActive = true,
    description?: string,
    id?: number,
  ) {
    this.id = id
    this.patientId = patientId
    this.doctorId = doctorId
    this.type = type
    this.title = title
    this.description = description
    this.scheduledTime = scheduledTime
    this.isActive = isActive
  }
}

