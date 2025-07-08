import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"

interface Appointment {
  id: number
  doctorId: number
  doctorName: string
  doctorPhoto: string
  date: string
  time: string
  day: string
  type: string
  status: 'confirmada' | 'pendiente' | 'cancelada'
  description?: string
}

@Component({
  selector: "app-calendar-patient",
  templateUrl: "./calendar-patient.component.html",
  styleUrls: ["./calendar-patient.component.css"],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CalendarPatientComponent implements OnInit {
  appointments: Appointment[] = []
  selectedDate: Date = new Date()
  currentMonth: Date = new Date()
  calendarDays: any[] = []

  // Modal para nueva cita
  showNewAppointmentModal = false
  newAppointment = {
    doctorId: 0,
    date: '',
    time: '',
    type: '',
    description: ''
  }

  // Doctores disponibles (simulado)
  availableDoctors = [
    { id: 1, name: "Dr. García", specialty: "Cardiología", photo: "assets/images/doctor1.png" },
    { id: 2, name: "Dr. López", specialty: "Neurología", photo: "assets/images/doctor2.png" },
    { id: 3, name: "Dr. Martínez", specialty: "Oncología", photo: "assets/images/doctor3.png" },
    { id: 4, name: "Dra. Rodríguez", specialty: "Ginecología", photo: "assets/images/doctor4.png" },
    { id: 5, name: "Dr. Hernández", specialty: "Pediatría", photo: "assets/images/doctor5.png" }
  ]

  appointmentTypes = [
    "Consulta General",
    "Seguimiento",
    "Urgencia",
    "Control",
    "Examen",
    "Revisión",
    "Chequeo Preventivo"
  ]

  timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30"
  ]

  constructor() {}

  ngOnInit(): void {
    this.loadAppointments()
    this.generateCalendar()
  }

  loadAppointments(): void {
    // Datos simulados de citas
    this.appointments = [
      {
        id: 1,
        doctorId: 1,
        doctorName: "Dr. García",
        doctorPhoto: "assets/images/doctor1.png",
        date: "2025-07-15",
        time: "10:30",
        day: "Martes",
        type: "Consulta General",
        status: "confirmada",
        description: "Revisión general de rutina y control de presión arterial"
      },
      {
        id: 2,
        doctorId: 2,
        doctorName: "Dr. López",
        doctorPhoto: "assets/images/doctor2.png",
        date: "2025-07-20",
        time: "14:00",
        day: "Domingo",
        type: "Seguimiento",
        status: "confirmada",
        description: "Control post-tratamiento neurológico"
      },
      {
        id: 3,
        doctorId: 3,
        doctorName: "Dr. Martínez",
        doctorPhoto: "assets/images/doctor3.png",
        date: "2025-07-25",
        time: "09:00",
        day: "Viernes",
        type: "Control",
        status: "pendiente",
        description: "Revisión de exámenes oncológicos"
      },
      {
        id: 4,
        doctorId: 1,
        doctorName: "Dr. García",
        doctorPhoto: "assets/images/doctor1.png",
        date: "2025-07-10",
        time: "16:30",
        day: "Jueves",
        type: "Chequeo Preventivo",
        status: "confirmada",
        description: "Chequeo preventivo anual"
      },
      {
        id: 5,
        doctorId: 4,
        doctorName: "Dra. Rodríguez",
        doctorPhoto: "assets/images/doctor4.png",
        date: "2025-07-30",
        time: "11:00",
        day: "Miércoles",
        type: "Consulta General",
        status: "pendiente",
        description: "Consulta ginecológica de rutina"
      }
    ]
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear()
    const month = this.currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    this.calendarDays = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dayAppointments = this.getAppointmentsForDate(currentDate)
      this.calendarDays.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: this.isToday(currentDate),
        isSelected: this.isSameDate(currentDate, this.selectedDate),
        appointments: dayAppointments,
        hasAppointments: dayAppointments.length > 0
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    const dateStr = this.formatDate(date)
    return this.appointments.filter(apt => apt.date === dateStr)
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  isToday(date: Date): boolean {
    const today = new Date()
    return this.isSameDate(date, today)
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }

  selectDate(day: any): void {
    this.selectedDate = new Date(day.date)
  }

  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1)
    this.generateCalendar()
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1)
    this.generateCalendar()
  }

  getMonthName(): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    return months[this.currentMonth.getMonth()]
  }

  getYear(): number {
    return this.currentMonth.getFullYear()
  }

  openNewAppointmentModal(): void {
    this.newAppointment = {
      doctorId: 0,
      date: this.formatDate(this.selectedDate),
      time: '',
      type: '',
      description: ''
    }
    this.showNewAppointmentModal = true
  }

  closeNewAppointmentModal(): void {
    this.showNewAppointmentModal = false
  }

  scheduleAppointment(): void {
    if (!this.newAppointment.doctorId || !this.newAppointment.date ||
      !this.newAppointment.time || !this.newAppointment.type) {
      alert('Por favor, complete todos los campos obligatorios')
      return
    }

    // Verificar que la fecha no sea en el pasado
    const selectedDate = new Date(this.newAppointment.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      alert('No se pueden agendar citas en fechas pasadas')
      return
    }

    // Verificar conflictos de horario
    const existingAppointment = this.appointments.find(apt =>
      apt.date === this.newAppointment.date &&
      apt.time === this.newAppointment.time &&
      apt.status !== 'cancelada'
    )

    if (existingAppointment) {
      alert('Ya tienes una cita programada en ese horario')
      return
    }

    const selectedDoctor = this.availableDoctors.find(d => d.id === Number(this.newAppointment.doctorId))
    if (!selectedDoctor) return

    const newId = Math.max(...this.appointments.map(a => a.id)) + 1
    const appointmentDate = new Date(this.newAppointment.date)
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

    const appointment: Appointment = {
      id: newId,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorPhoto: selectedDoctor.photo,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      day: dayNames[appointmentDate.getDay()],
      type: this.newAppointment.type,
      status: 'pendiente',
      description: this.newAppointment.description
    }

    this.appointments.push(appointment)
    this.generateCalendar()
    this.showNewAppointmentModal = false

    alert(`Cita agendada exitosamente con ${selectedDoctor.name} para el ${this.formatDateDisplay(this.newAppointment.date)} a las ${this.newAppointment.time}`)
    console.log('Cita agendada:', appointment)
  }

  cancelAppointment(appointmentId: number): void {
    const appointment = this.appointments.find(a => a.id === appointmentId)
    if (appointment && confirm(`¿Está seguro de cancelar la cita con ${appointment.doctorName}?`)) {
      appointment.status = 'cancelada'
      this.generateCalendar()
      alert('Cita cancelada exitosamente')
      console.log('Cita cancelada:', appointment)
    }
  }

  rescheduleAppointment(appointmentId: number): void {
    const appointment = this.appointments.find(a => a.id === appointmentId)
    if (appointment) {
      // Pre-llenar el modal con los datos de la cita existente
      this.newAppointment = {
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        description: appointment.description || ''
      }

      // Cancelar la cita actual
      appointment.status = 'cancelada'

      // Abrir modal para nueva cita
      this.showNewAppointmentModal = true
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmada':
        return 'status-confirmed'
      case 'pendiente':
        return 'status-pending'
      case 'cancelada':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  getSelectedDateAppointments(): Appointment[] {
    return this.getAppointmentsForDate(this.selectedDate).filter(apt => apt.status !== 'cancelada')
  }

  // MÉTODO NUEVO: Obtener próximas citas (reemplaza la lógica del template)
  getUpcomingAppointments(): Appointment[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return this.appointments
      .filter(a => {
        const appointmentDate = new Date(a.date)
        return appointmentDate >= today && a.status !== 'cancelada'
      })
      .sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time)
        const dateB = new Date(b.date + 'T' + b.time)
        return dateA.getTime() - dateB.getTime()
      })
      .slice(0, 3)
  }

  // MÉTODO NUEVO: Formatear fecha para mostrar
  formatDateDisplay(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // MÉTODO NUEVO: Formatear fecha corta
  formatDateShort(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    })
  }

  // MÉTODO NUEVO: Obtener día del mes
  getDateDay(dateString: string): number {
    const date = new Date(dateString)
    return date.getDate()
  }

  // MÉTODO NUEVO: Obtener mes corto
  getDateMonth(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { month: 'short' })
  }

  isDateDisabled(date: string): boolean {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Deshabilitar fechas pasadas
    return selectedDate < today
  }

  getAvailableTimeSlots(date: string): string[] {
    // Filtrar horarios ya ocupados para la fecha seleccionada
    const existingAppointments = this.appointments.filter(apt =>
      apt.date === date && apt.status !== 'cancelada'
    )

    const occupiedTimes = existingAppointments.map(apt => apt.time)

    return this.timeSlots.filter(time => !occupiedTimes.includes(time))
  }

  onDateChange(): void {
    // Cuando cambia la fecha en el modal, actualizar los horarios disponibles
    this.newAppointment.time = ''
  }
}
