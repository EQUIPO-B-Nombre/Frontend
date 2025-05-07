export class Prescription {
  id?: number;
  medicationName: string;
  dosage: string;
  patientId: number;
  doctorId: number;

  constructor(
    medicationName: string,
    dosage: string,
    patientId: number,
    doctorId: number
  ) {
    this.medicationName = medicationName;
    this.dosage = dosage;
    this.patientId = patientId;
    this.doctorId = doctorId;
  }


}
