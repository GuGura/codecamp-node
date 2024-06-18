import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}