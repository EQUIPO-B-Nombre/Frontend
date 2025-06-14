export class Prescription {
  id?: number
  patientId: number
  doctorId: number
  medicationName: string
  instructions: string
  dosage?: string
  frequency?: string
  duration?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(
    patientId: number,
    doctorId: number,
    medicationName: string,
    instructions: string,
    dosage?: string,
    frequency?: string,
    duration?: string,
    id?: number,
  ) {
    this.id = id
    this.patientId = patientId
    this.doctorId = doctorId
    this.medicationName = medicationName
    this.instructions = instructions
    this.dosage = dosage
    this.frequency = frequency
    this.duration = duration
  }
}

