import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Shape } from "./Shape";
import { Connection } from "./Connection";

@Entity()
export class Canvas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @OneToMany(() => Shape, (shape) => shape.canvas, { cascade: true })
  shapes: Shape[];

  @OneToMany(() => Connection, (connection) => connection.canvas, { cascade: true })
  connections: Connection[];
}
