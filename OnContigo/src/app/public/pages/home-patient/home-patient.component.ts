import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-home-patient",
  templateUrl: "./home-patient.component.html",
  styleUrls: ["./home-patient.component.css"],
  standalone: false
})
export class HomePatientComponent implements OnInit {
  patientName = "Jane Doe"
  patientProfileImage = "assets/images/doctor-profile.png"

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías cargar los datos del doctor desde un servicio
  }

  navigateToPatientList(): void {
    // Implementar navegación a la lista de pacientes
    console.log("Navegando a lista de pacientes")
  }

  navigateToCalendar(): void {
    // Implementar navegación al calendario
    console.log("Navegando al calendario")
  }
}