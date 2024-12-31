import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Canvas } from "./Canvas";

@Entity()
export class Shape {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToOne(() => Canvas, (canvas) => canvas.shapes, { onDelete: "CASCADE" })
  canvas: Canvas;
}
