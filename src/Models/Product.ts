import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductVariant } from "./ProductVariant";
import { Size } from "./Size";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  productVariants: ProductVariant[];

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

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
