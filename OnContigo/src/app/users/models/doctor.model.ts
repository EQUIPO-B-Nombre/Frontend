export class Doctor {
  id?: number;
  userId: number;
  experience: number;

  constructor(userId: number, experience: number = 0.0, id?: number) {
    this.id = id;
    this.userId = userId;
    this.experience = experience;
  }


}
