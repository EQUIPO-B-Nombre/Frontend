import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import {PatientDoctorService, PatientWithProfile} from '../../../shared/services/patient-doctor.service';
import {PrescriptionService} from '../../../healthTracking/services/prescription.service';
import {HealthTrackingService} from '../../../healthTracking/services/health-tracking.service';
import {DoctorService} from '../../../users/services/doctor.service';
import {UserApiService} from '../../../users/services/user.service';
import {HealthTracking} from '../../../healthTracking/models/health-tracking.model';
import {Prescription} from '../../../healthTracking/models/prescription.model';

interface Medication {
  id: number
  name: string
  instructions: string
}

interface AlarmData {
  patientId: number
  patientName: string
  patientDni: string
  hours: number
  minutes: number
  note: string
}

@Component({
  selector: "app-patients-doctor",
  templateUrl: "./patients-doctor.component.html",
  styleUrls: ["./patients-doctor.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PatientsDoctorComponent implements OnInit {
  patients: PatientWithProfile[] = []
  showAlarmModal = false
  showDeleteModal = false
  showDetailsModal = false
  showAddPatientModal = false
  showMedicationModal = false
  selectedPatientId: number | null = null
  isEditingDiagnosis = false
  newPatientDni = ""
  isLoading = true
  doctorId = 0

  selectedAlarm: AlarmData = {
    patientId: 0,
    patientName: "",
    patientDni: "",
    hours: 12,
    minutes: 0,
    note: "",
  }

  patientToDelete: PatientWithProfile | null = null
  selectedPatient: PatientWithProfile | null = null

  medications: Medication[] = []
  newMedication: Medication = {
    id: 0,
    name: "",
    instructions: "",
  }
  selectedMedicationIndex: number | null = null

  constructor(
    private patientDoctorService: PatientDoctorService,
    private prescriptionService: PrescriptionService,
    private healthTrackingService: HealthTrackingService,
    private doctorService: DoctorService,
    private userApiService: UserApiService,
  ) {}

  ngOnInit(): void {
    this.loadDoctorData()
  }

  private loadDoctorData(): void {
    this.doctorId = this.doctorService.getDoctorId()

    if (this.doctorId) {
      this.loadPatients()
    } else {
      // Si no hay doctorId en localStorage, obtenerlo del usuario actual
      const userId = this.userApiService.getUserId()
      this.doctorService.getAll().subscribe({
        next: (doctors) => {
          const doctor = doctors.find((d) => d.userId === userId)
          if (doctor) {
            this.doctorId = doctor.id!
            this.doctorService.setDoctorId(this.doctorId)
            this.loadPatients()
          }
        },
        error: (error) => {
          console.error("Error loading doctor:", error)
          this.isLoading = false
        },
      })
    }
  }

  private loadPatients(): void {
    this.patientDoctorService.getPatientsByDoctorId(this.doctorId).subscribe({
      next: (patients) => {
        this.patients = patients
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading patients:", error)
        this.isLoading = false
        // Fallback a datos de ejemplo si hay error
        this.loadFallbackData()
      },
    })
  }

  private loadFallbackData(): void {
    // Datos de ejemplo como fallback
    this.patients = [
      {
        patient: { id: 1, userId: 1 },
        profile: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          dni: "13423432",
          phone: "999 888 777",
          email: "john.doe@gmail.com",
          city: "Lima",
          country: "Peru",
          birthDate: new Date("1990-01-01"),
          userId: 1,
        },
        lastAppointment: new Date("2024-01-15"),
        nextAppointment: new Date("2024-02-15"),
        hasAlert: true,
      },
    ]
  }

  selectPatient(patientId: number): void {
    if (this.selectedPatientId === patientId) {
      this.selectedPatientId = null
    } else {
      this.selectedPatientId = patientId
    }
  }

  isPatientSelected(patientId: number): boolean {
    return this.selectedPatientId === patientId
  }

  openAddPatientModal(): void {
    this.newPatientDni = ""
    this.showAddPatientModal = true
  }

  closeAddPatientModal(): void {
    this.showAddPatientModal = false
  }

  addPatient(): void {
    if (!this.newPatientDni.trim()) {
      alert("Por favor, ingrese un DNI válido")
      return
    }

    // Buscar paciente por DNI
    this.patientDoctorService.searchPatientByDni(this.newPatientDni).subscribe({
      next: (patientWithProfile) => {
        // Asignar el paciente al doctor actual
        this.patientDoctorService.assignPatientToDoctor(patientWithProfile.patient.id!, this.doctorId).subscribe({
          next: () => {
            this.patients.push(patientWithProfile)
            this.showAddPatientModal = false
            alert("Paciente agregado exitosamente")
          },
          error: (error) => {
            console.error("Error assigning patient to doctor:", error)
            alert("Error al asignar el paciente")
          },
        })
      },
      error: (error) => {
        console.error("Error searching patient:", error)
        alert("No se encontró un paciente con ese DNI")
      },
    })
  }

  viewDetails(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }

    const patient = this.patients.find((p) => p.patient.id === this.selectedPatientId)
    if (patient) {
      this.selectedPatient = patient
      this.showDetailsModal = true
    }
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false
    this.selectedPatient = null
    this.isEditingDiagnosis = false
  }

  startEditDiagnosis(): void {
    this.isEditingDiagnosis = true
  }

  saveDiagnosis(): void {
    if (!this.selectedPatient?.profile) return
    this.isEditingDiagnosis = false
    // Aquí implementarías la lógica para guardar el diagnóstico
    console.log("Diagnóstico guardado")
  }

  openChat(): void {
    if (!this.selectedPatient?.profile) return
    console.log("Abriendo chat con el paciente:", this.selectedPatient.profile.firstName)
  }

  prescribeMedication(): void {
    this.openMedicationModal()
  }

  openDeleteModal(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }

    const patient = this.patients.find((p) => p.patient.id === this.selectedPatientId)
    if (patient) {
      this.patientToDelete = patient
      this.showDeleteModal = true
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false
    this.patientToDelete = null
  }

  confirmDeletePatient(): void {
    if (this.patientToDelete) {
      // Aquí implementarías la lógica para desasignar el paciente del doctor
      console.log("Eliminando paciente:", this.patientToDelete)
      this.patients = this.patients.filter((p) => p.patient.id !== this.patientToDelete?.patient.id)
      this.selectedPatientId = null
      this.showDeleteModal = false
      this.patientToDelete = null
    }
  }

  openAlarmModal(patient: PatientWithProfile): void {
    this.selectedAlarm = {
      patientId: patient.patient.id!,
      patientName: `${patient.profile.firstName} ${patient.profile.lastName}`,
      patientDni: patient.profile.dni,
      hours: 13,
      minutes: 30,
      note: "",
    }
    this.showAlarmModal = true
  }

  closeAlarmModal(): void {
    this.showAlarmModal = false
  }

  saveAlarm(): void {
    const healthTracking = new HealthTracking(
      this.selectedAlarm.patientId,
      this.doctorId,
      "alarm",
      "Recordatorio de medicamento",
      new Date(),
      true,
      this.selectedAlarm.note,
    )

    // Configurar la hora de la alarma
    const alarmDate = new Date()
    alarmDate.setHours(this.selectedAlarm.hours, this.selectedAlarm.minutes, 0, 0)
    healthTracking.scheduledTime = alarmDate

    this.healthTrackingService.create(healthTracking).subscribe({
      next: (response) => {
        console.log("Alarma guardada:", response)
        this.showAlarmModal = false
        alert("Alarma configurada exitosamente")
      },
      error: (error) => {
        console.error("Error saving alarm:", error)
        alert("Error al configurar la alarma")
      },
    })
  }

  incrementHours(): void {
    this.selectedAlarm.hours = (this.selectedAlarm.hours + 1) % 24
  }

  decrementHours(): void {
    this.selectedAlarm.hours = (this.selectedAlarm.hours - 1 + 24) % 24
  }

  incrementMinutes(): void {
    this.selectedAlarm.minutes = (this.selectedAlarm.minutes + 1) % 60
  }

  decrementMinutes(): void {
    this.selectedAlarm.minutes = (this.selectedAlarm.minutes - 1 + 60) % 60
  }

  openMedicationModal(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }

    const patient = this.patients.find((p) => p.patient.id === this.selectedPatientId)
    if (patient) {
      this.selectedPatient = patient
      this.loadPatientMedications()
      this.resetNewMedication()
      this.showMedicationModal = true
    }
  }

  private loadPatientMedications(): void {
    if (this.selectedPatient) {
      this.prescriptionService.getAll().subscribe({
        next: (prescriptions) => {
          // Filtrar prescripciones del paciente actual
          const patientPrescriptions = prescriptions.filter((p) => p.patientId === this.selectedPatient!.patient.id)

          this.medications = patientPrescriptions.map((prescription, index) => ({
            id: prescription.id || index + 1,
            name: prescription.medicationName,
            instructions: prescription.instructions,
          }))
        },
        error: (error) => {
          console.error("Error loading medications:", error)
          this.medications = []
        },
      })
    }
  }

  closeMedicationModal(): void {
    this.showMedicationModal = false
    this.resetNewMedication()
    this.selectedMedicationIndex = null
  }

  resetNewMedication(): void {
    this.newMedication = {
      id: 0,
      name: "",
      instructions: "",
    }
  }

  addMedication(): void {
    if (!this.newMedication.name.trim()) {
      alert("Por favor, ingrese el nombre del medicamento")
      return
    }

    const prescription = new Prescription(
      this.selectedPatient!.patient.id!,
      this.doctorId,
      this.newMedication.name,
      this.newMedication.instructions,
    )

    this.prescriptionService.create(prescription).subscribe({
      next: (response) => {
        const newId = this.medications.length > 0 ? Math.max(...this.medications.map((m) => m.id)) + 1 : 1

        this.medications.push({
          id: newId,
          name: this.newMedication.name,
          instructions: this.newMedication.instructions,
        })

        this.resetNewMedication()
        alert("Medicamento agregado exitosamente")
      },
      error: (error) => {
        console.error("Error adding medication:", error)
        alert("Error al agregar el medicamento")
      },
    })
  }

  editMedication(index: number): void {
    this.selectedMedicationIndex = index
    this.newMedication = { ...this.medications[index] }
  }

  updateMedication(): void {
    if (this.selectedMedicationIndex !== null) {
      const medication = this.medications[this.selectedMedicationIndex]

      const prescription = new Prescription(
        this.selectedPatient!.patient.id!,
        this.doctorId,
        this.newMedication.name,
        this.newMedication.instructions,
      )

      this.prescriptionService.update(medication.id, prescription).subscribe({
        next: (response) => {
          this.medications[this.selectedMedicationIndex!] = { ...this.newMedication }
          this.resetNewMedication()
          this.selectedMedicationIndex = null
          alert("Medicamento actualizado exitosamente")
        },
        error: (error) => {
          console.error("Error updating medication:", error)
          alert("Error al actualizar el medicamento")
        },
      })
    }
  }

  deleteMedication(index: number): void {
    const medication = this.medications[index]

    this.prescriptionService.delete(medication.id).subscribe({
      next: () => {
        this.medications.splice(index, 1)
        if (this.selectedMedicationIndex === index) {
          this.resetNewMedication()
          this.selectedMedicationIndex = null
        }
        alert("Medicamento eliminado exitosamente")
      },
      error: (error) => {
        console.error("Error deleting medication:", error)
        alert("Error al eliminar el medicamento")
      },
    })
  }

  confirmMedications(): void {
    console.log("Medicamentos confirmados:", this.medications)
    this.showMedicationModal = false
    alert("Prescripciones guardadas exitosamente")
  }

  // Métodos auxiliares para el template
  getPatientFullName(patient: PatientWithProfile): string {
    if (!patient?.profile) return "N/A"
    return `${patient.profile.firstName || ""} ${patient.profile.lastName || ""}`.trim()
  }

  formatDate(date: Date | undefined): string {
    if (!date) return "dd/mm/yy"
    return new Date(date).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }
}
