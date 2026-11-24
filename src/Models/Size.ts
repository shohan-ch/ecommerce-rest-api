import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductVariant } from "./ProductVariant";

@Entity("Size")
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => ProductVariant)
  variants: ProductVariant[];

  @Column({
    type: "bit",
    default: 1,
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => Number(value),
    },
  })
  status: number = 1;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
