import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Patient {
  id: number
  dni: string
  name: string
  lastAppointment: string
  nextAppointment: string
  hasAlert: boolean
  photoUrl: string
  email?: string
  phone?: string
  diagnosis?: string
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
  patients: Patient[] = []
  showAlarmModal = false
  showDeleteModal = false
  showDetailsModal = false
  showAddPatientModal = false
  selectedPatientId: number | null = null
  isEditingDiagnosis = false
  newPatientDni = ""

  selectedAlarm: AlarmData = {
    patientId: 0,
    patientName: "",
    patientDni: "",
    hours: 12,
    minutes: 0,
    note: "",
  }

  patientToDelete: Patient | null = null
  selectedPatient: Patient | null = null

  constructor() {}

  ngOnInit(): void {
    // Datos de ejemplo - en el futuro se obtendrán de la API
    this.patients = [
      {
        id: 1,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de pulmón",
      },
      {
        id: 2,
        dni: "73805906",
        name: "Jane Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "example@gmail.com",
        phone: "999 999 999",
        diagnosis: "Disease",
      },
      {
        id: 3,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de mama",
      },
      {
        id: 4,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de colon",
      },
      {
        id: 5,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de próstata",
      },
      {
        id: 6,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de piel",
      },
      {
        id: 7,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de estómago",
      },
      {
        id: 8,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de páncreas",
      },
      {
        id: 9,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
        email: "john.doe@gmail.com",
        phone: "999 888 777",
        diagnosis: "Cáncer de hígado",
      },
    ]
  }

  selectPatient(patientId: number): void {
    if (this.selectedPatientId === patientId) {
      this.selectedPatientId = null // Deseleccionar si ya estaba seleccionado
    } else {
      this.selectedPatientId = patientId // Seleccionar nuevo paciente
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

    console.log("Agregando paciente con DNI:", this.newPatientDni)
    // Aquí implementarías la lógica para agregar el paciente a la base de datos

    // Simulamos la adición de un nuevo paciente a la lista local
    const newId = Math.max(...this.patients.map((p) => p.id)) + 1
    const newPatient: Patient = {
      id: newId,
      dni: this.newPatientDni,
      name: "Nuevo Paciente",
      lastAppointment: "dd/mm/yy",
      nextAppointment: "dd/mm/yy",
      hasAlert: false,
      photoUrl: "",
      email: "",
      phone: "",
      diagnosis: "",
    }

    this.patients.push(newPatient)
    this.showAddPatientModal = false
  }

  viewDetails(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }

    const patient = this.patients.find((p) => p.id === this.selectedPatientId)
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
    this.isEditingDiagnosis = false
    // Aquí implementarías la lógica para guardar el diagnóstico en la base de datos
    console.log("Diagnóstico guardado:", this.selectedPatient?.diagnosis)
  }

  openChat(): void {
    console.log("Abriendo chat con el paciente:", this.selectedPatient?.name)
    // Implementar lógica para abrir el chat
  }

  prescribeMedication(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }
    console.log("Recetar medicamento al paciente", this.selectedPatientId)
    // Implementar lógica para recetar medicamento
  }

  openDeleteModal(): void {
    if (!this.selectedPatientId) {
      alert("Por favor, seleccione un paciente primero")
      return
    }

    const patient = this.patients.find((p) => p.id === this.selectedPatientId)
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
      console.log("Eliminando paciente:", this.patientToDelete)
      // Aquí implementarías la lógica para eliminar el paciente de la base de datos

      // Eliminar de la lista local
      this.patients = this.patients.filter((p) => p.id !== this.patientToDelete?.id)
      this.selectedPatientId = null
      this.showDeleteModal = false
      this.patientToDelete = null
    }
  }

  openAlarmModal(patient: Patient): void {
    this.selectedAlarm = {
      patientId: patient.id,
      patientName: patient.name,
      patientDni: patient.dni,
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
    console.log("Guardando alarma:", this.selectedAlarm)
    // Aquí implementarías la lógica para guardar la alarma en la base de datos
    this.showAlarmModal = false
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
}
