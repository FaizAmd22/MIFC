import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Canvas } from "./Canvas";

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @ManyToOne(() => Canvas, (canvas) => canvas.connections, { onDelete: "CASCADE" })
  canvas: Canvas;
}
