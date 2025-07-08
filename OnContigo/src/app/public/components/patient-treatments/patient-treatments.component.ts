import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Treatment {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  status: 'activo' | 'completado' | 'pausado' | 'cancelado'
  progress: number
  doctorName: string
  doctorPhoto: string
  medications: Medication[]
  appointments: TreatmentAppointment[]
  notes: TreatmentNote[]
}

interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  instructions: string
  startDate: string
  endDate?: string
  taken: boolean
  nextDose?: string
}

interface TreatmentAppointment {
  id: number
  date: string
  time: string
  type: string
  status: 'programada' | 'completada' | 'cancelada'
  notes?: string
}

interface TreatmentNote {
  id: number
  date: string
  title: string
  content: string
  author: string
  type: 'doctor' | 'patient' | 'system'
}

@Component({
  selector: "app-patient-treatments",
  templateUrl: "./patient-treatments.component.html",
  styleUrls: ["./patient-treatments.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PatientTreatmentsComponent implements OnInit {
  treatments: Treatment[] = []
  selectedTreatment: Treatment | null = null
  activeTab: 'overview' | 'medications' | 'appointments' | 'notes' = 'overview'

  // Modal para nueva nota
  showNewNoteModal = false
  newNote = {
    title: '',
    content: ''
  }

  constructor() {}

  ngOnInit(): void {
    this.loadTreatments()
  }

  loadTreatments(): void {
    // Datos simulados de tratamientos
    this.treatments = [
      {
        id: 1,
        name: "Tratamiento de Hipertensión",
        description: "Control y manejo de presión arterial elevada mediante medicamentos y cambios en el estilo de vida",
        startDate: "2025-01-15",
        endDate: "2025-07-15",
        status: "activo",
        progress: 65,
        doctorName: "Dr. García",
        doctorPhoto: "assets/images/doctor1.png",
        medications: [
          {
            id: 1,
            name: "Enalapril",
            dosage: "10mg",
            frequency: "2 veces al día",
            instructions: "Tomar con las comidas, mañana y noche",
            startDate: "2025-01-15",
            taken: true,
            nextDose: "20:00"
          },
          {
            id: 2,
            name: "Hidroclorotiazida",
            dosage: "25mg",
            frequency: "1 vez al día",
            instructions: "Tomar en la mañana con el desayuno",
            startDate: "2025-01-15",
            taken: false,
            nextDose: "08:00"
          }
        ],
        appointments: [
          {
            id: 1,
            date: "2025-07-15",
            time: "10:30",
            type: "Control de Presión",
            status: "programada"
          },
          {
            id: 2,
            date: "2025-06-15",
            time: "11:00",
            type: "Revisión Mensual",
            status: "completada",
            notes: "Presión arterial estable, continuar con medicación"
          }
        ],
        notes: [
          {
            id: 1,
            date: "2025-06-15",
            title: "Progreso Excelente",
            content: "El paciente muestra una mejora significativa en los niveles de presión arterial. Se recomienda continuar con el tratamiento actual.",
            author: "Dr. García",
            type: "doctor"
          },
          {
            id: 2,
            date: "2025-06-10",
            title: "Efectos Secundarios",
            content: "He experimentado algo de mareo por las mañanas, pero es tolerable.",
            author: "Paciente",
            type: "patient"
          }
        ]
      },
      {
        id: 2,
        name: "Rehabilitación Post-Cirugía",
        description: "Programa de rehabilitación física después de cirugía de rodilla",
        startDate: "2025-05-01",
        endDate: "2025-08-01",
        status: "activo",
        progress: 40,
        doctorName: "Dr. López",
        doctorPhoto: "assets/images/doctor2.png",
        medications: [
          {
            id: 3,
            name: "Ibuprofeno",
            dosage: "400mg",
            frequency: "3 veces al día",
            instructions: "Tomar después de las comidas para reducir la inflamación",
            startDate: "2025-05-01",
            endDate: "2025-07-01",
            taken: true,
            nextDose: "14:00"
          }
        ],
        appointments: [
          {
            id: 3,
            date: "2025-07-20",
            time: "14:00",
            type: "Sesión de Fisioterapia",
            status: "programada"
          }
        ],
        notes: [
          {
            id: 3,
            date: "2025-06-20",
            title: "Mejora en Movilidad",
            content: "El rango de movimiento ha mejorado considerablemente. Continuar con ejercicios.",
            author: "Dr. López",
            type: "doctor"
          }
        ]
      },
      {
        id: 3,
        name: "Control de Diabetes",
        description: "Manejo integral de diabetes tipo 2 con dieta, ejercicio y medicación",
        startDate: "2024-12-01",
        endDate: "2025-12-01",
        status: "activo",
        progress: 80,
        doctorName: "Dr. Martínez",
        doctorPhoto: "assets/images/doctor3.png",
        medications: [
          {
            id: 4,
            name: "Metformina",
            dosage: "500mg",
            frequency: "2 veces al día",
            instructions: "Tomar con las comidas principales",
            startDate: "2024-12-01",
            taken: true,
            nextDose: "19:00"
          }
        ],
        appointments: [
          {
            id: 4,
            date: "2025-07-25",
            time: "09:00",
            type: "Control de Glucosa",
            status: "programada"
          }
        ],
        notes: [
          {
            id: 4,
            date: "2025-06-25",
            title: "HbA1c Mejorada",
            content: "Los niveles de HbA1c han bajado a 6.8%. Excelente progreso.",
            author: "Dr. Martínez",
            type: "doctor"
          }
        ]
      }
    ]

    // Seleccionar el primer tratamiento por defecto
    if (this.treatments.length > 0) {
      this.selectedTreatment = this.treatments[0]
    }
  }

  selectTreatment(treatment: Treatment): void {
    this.selectedTreatment = treatment
    this.activeTab = 'overview'
  }

  setActiveTab(tab: 'overview' | 'medications' | 'appointments' | 'notes'): void {
    this.activeTab = tab
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'activo':
        return 'status-active'
      case 'completado':
        return 'status-completed'
      case 'pausado':
        return 'status-paused'
      case 'cancelado':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  getAppointmentStatusClass(status: string): string {
    switch (status) {
      case 'programada':
        return 'appointment-scheduled'
      case 'completada':
        return 'appointment-completed'
      case 'cancelada':
        return 'appointment-cancelled'
      default:
        return ''
    }
  }

  markMedicationAsTaken(medicationId: number): void {
    if (!this.selectedTreatment) return

    const medication = this.selectedTreatment.medications.find(m => m.id === medicationId)
    if (medication) {
      medication.taken = true
      console.log(`Medicamento ${medication.name} marcado como tomado`)
    }
  }

  openNewNoteModal(): void {
    this.newNote = {
      title: '',
      content: ''
    }
    this.showNewNoteModal = true
  }

  closeNewNoteModal(): void {
    this.showNewNoteModal = false
  }

  addNote(): void {
    if (!this.selectedTreatment || !this.newNote.title.trim() || !this.newNote.content.trim()) {
      alert('Por favor, complete todos los campos')
      return
    }

    const newId = Math.max(...this.selectedTreatment.notes.map(n => n.id)) + 1
    const note: TreatmentNote = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      title: this.newNote.title,
      content: this.newNote.content,
      author: 'Paciente',
      type: 'patient'
    }

    this.selectedTreatment.notes.unshift(note)
    this.showNewNoteModal = false
    console.log('Nueva nota agregada:', note)
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  getTreatmentDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}
