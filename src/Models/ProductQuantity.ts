import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";
import { Color } from "./Color";

@Entity("ProductQuantity")
export class ProductQuantity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productVariantId: number;

  @Column()
  productSizeId: number;

  @Column()
  productColorId: number;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
