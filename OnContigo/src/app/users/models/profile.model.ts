export class Profile {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  birthDate: Date;
  description?: string;
  photo?: string;
  experience?: number;
  dni: string;
  phone: string;
  userId: number;

  constructor(
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    birthDate: Date,
    dni: string,
    phone: string,
    userId: number,
    description?: string,
    photo?: string,
    experience?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.country = country;
    this.birthDate = birthDate;
    this.dni = dni;
    this.phone = phone;
    this.userId = userId;
    this.description = description;
    this.photo = photo;
    this.experience = experience;
  }


}
