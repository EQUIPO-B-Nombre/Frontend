import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-home-doctor",
  templateUrl: "./home-doctor.component.html",
  styleUrls: ["./home-doctor.component.css"],
  standalone: false
})
export class HomeDoctorComponent implements OnInit {
  doctorName = "Jane Doe"

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

