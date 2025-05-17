import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface Appointment {
  id: number
  patientId: number
  patientName: string
  patientPhoto: string
  date: string
  time: string
  day: string
  hasAlert: boolean
}

interface Patient {
  id: number
  name: string
  photo: string
  appointmentDate: string
}

@Component({
  selector: "app-calendar-doctor",
  templateUrl: "./calendar-doctor.component.html",
  styleUrls: ["./calendar-doctor.component.css"],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CalendarDoctorComponent implements OnInit {
  appointments: Appointment[] = []
  patients: Patient[] = []
  weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
  dayNumbers = ["02", "03", "04", "05", "06", "07"]
  hours = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  constructor() {}

  ngOnInit(): void {
    // Datos de ejemplo para pacientes
    this.patients = [
      {
        id: 1,
        name: "Patient #1",
        photo: "assets/images/patient1.png",
        appointmentDate: "02/04/2024",
      },
      {
        id: 2,
        name: "Patient #2",
        photo: "assets/images/patient2.png",
        appointmentDate: "02/04/2024",
      },
      {
        id: 3,
        name: "Patient #3",
        photo: "assets/images/patient3.png",
        appointmentDate: "02/04/2024",
      },
      {
        id: 4,
        name: "Patient #4",
        photo: "assets/images/patient4.png",
        appointmentDate: "02/04/2024",
      },
      {
        id: 5,
        name: "Patient #5",
        photo: "assets/images/patient5.png",
        appointmentDate: "02/04/2024",
      },
    ]

    // Datos de ejemplo para citas
    this.appointments = [
      {
        id: 1,
        patientId: 1,
        patientName: "Patient #1",
        patientPhoto: "assets/images/patient1.png",
        date: "02/04/2024",
        time: "11:30 am",
        day: "Mon",
        hasAlert: true,
      },
      {
        id: 2,
        patientId: 2,
        patientName: "Patient #2",
        patientPhoto: "assets/images/patient2.png",
        date: "02/04/2024",
        time: "10:30 am",
        day: "Mon",
        hasAlert: false,
      },
      {
        id: 3,
        patientId: 3,
        patientName: "Patient #3",
        patientPhoto: "assets/images/patient3.png",
        date: "04/04/2024",
        time: "11:30 am",
        day: "Wed",
        hasAlert: false,
      },
      {
        id: 4,
        patientId: 4,
        patientName: "Patient #4",
        patientPhoto: "assets/images/patient4.png",
        date: "05/04/2024",
        time: "11:30 am",
        day: "Thu",
        hasAlert: false,
      },
      {
        id: 5,
        patientId: 5,
        patientName: "Patient #5",
        patientPhoto: "assets/images/patient5.png",
        date: "06/04/2024",
        time: "11:30 am",
        day: "Fri",
        hasAlert: false,
      },
      {
        id: 6,
        patientId: 1,
        patientName: "Patient #1",
        patientPhoto: "assets/images/patient1.png",
        date: "07/04/2024",
        time: "11:30 am",
        day: "Sat",
        hasAlert: false,
      },
    ]
  }

  getAppointmentPosition(day: string, time: string): { top: string; left: string } {
    // Calcular la posición de la cita en el calendario
    const dayIndex = this.weekDays.findIndex((d) => d === day)
    const hour = Number.parseInt(time.split(":")[0])
    const minute = Number.parseInt(time.split(":")[1])

    // Calcular posición vertical (top) basada en la hora
    const hourIndex = this.hours.findIndex((h) => h.startsWith(hour.toString().padStart(2, "0")))
    const topPosition = hourIndex * 40 + (minute / 60) * 40 // 40px por hora

    // Calcular posición horizontal (left) basada en el día
    const leftPosition = dayIndex * (100 / 6) // Dividir el ancho en 6 días

    return {
      top: `${topPosition}px`,
      left: `${leftPosition}%`,
    }
  }

  hasAppointmentAt(day: string, hour: string): boolean {
    return this.appointments.some(
      (appointment) => appointment.day === day && appointment.time.startsWith(hour.split(":")[0]),
    )
  }

  getAppointmentsForDayAndHour(day: string, hour: string): Appointment[] {
    return this.appointments.filter(
      (appointment) => appointment.day === day && appointment.time.startsWith(hour.split(":")[0]),
    )
  }

  navigateToPatients(): void {
    // Implementar navegación a la lista de pacientes
    console.log("Navegando a lista de pacientes")
  }
}

