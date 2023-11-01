import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role: string = 'user'; // Alapértelmezett érték beállítása

  constructor() {
    this.id = 0; // Ha szükséges, itt is inicializálhatod
  }
}
