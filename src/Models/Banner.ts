import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Banner")
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  title: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({
    type: "bit",
    default: "1",
  })
  status: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
