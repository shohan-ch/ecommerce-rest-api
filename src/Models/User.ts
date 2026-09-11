import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: "timestamp",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
  })
  updatedAt: Date;
}
