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

@Entity("ProductVariant")
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productVariants)
  product: Product;

  @Column()
  productId: number;

  @ManyToMany(() => Size)
  @JoinTable({ name: "ProductSize" })
  sizes: Size[];

  @ManyToMany(() => Color)
  @JoinTable({ name: "ProductColor" })
  colors: Color[];

  @Column({ unique: true })
  sku: string;

  @Column({ type: "json" })
  images: string;

  @Column({ type: "json" })
  videos: string;

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
