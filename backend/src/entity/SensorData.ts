import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  timestamp: Date;
}
