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
  patients: Patient[] = [];
  showAlarmModal = false;
  selectedAlarm: AlarmData = {
    patientId: 0,
    patientName: "",
    patientDni: "",
    hours: 12,
    minutes: 0,
    note: "",
  };

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
      },
      {
        id: 2,
        dni: "73805906",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 3,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 4,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 5,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 6,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 7,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 8,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
      {
        id: 9,
        dni: "13423432",
        name: "John Doe",
        lastAppointment: "dd/mm/yy",
        nextAppointment: "dd/mm/yy",
        hasAlert: true,
        photoUrl: "",
      },
    ];
  }

  addPatient(): void {
    console.log("Agregar paciente");
    // Implementar lógica para agregar paciente
  }

  viewDetails(patientId: number): void {
    console.log("Ver detalles del paciente", patientId);
    // Implementar lógica para ver detalles
  }

  prescribeMedication(patientId: number): void {
    console.log("Recetar medicamento al paciente", patientId);
    // Implementar lógica para recetar medicamento
  }

  deletePatient(patientId: number): void {
    console.log("Eliminar paciente", patientId);
    // Implementar lógica para eliminar paciente
  }

  openAlarmModal(patient: Patient): void {
    this.selectedAlarm = {
      patientId: patient.id,
      patientName: patient.name,
      patientDni: patient.dni,
      hours: 13,
      minutes: 30,
      note: "",
    };
    this.showAlarmModal = true;
  }

  closeAlarmModal(): void {
    this.showAlarmModal = false;
  }

  saveAlarm(): void {
    console.log("Guardando alarma:", this.selectedAlarm);
    // Aquí implementarías la lógica para guardar la alarma en la base de datos
    this.showAlarmModal = false;
  }

  incrementHours(): void {
    this.selectedAlarm.hours = (this.selectedAlarm.hours + 1) % 24;
  }

  decrementHours(): void {
    this.selectedAlarm.hours = (this.selectedAlarm.hours - 1 + 24) % 24;
  }

  incrementMinutes(): void {
    this.selectedAlarm.minutes = (this.selectedAlarm.minutes + 1) % 60;
  }

  decrementMinutes(): void {
    this.selectedAlarm.minutes = (this.selectedAlarm.minutes - 1 + 60) % 60;
  }
}


