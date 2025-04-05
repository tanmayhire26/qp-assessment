import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GroceryProduct } from './grocery-product.entity';

@Entity('grocery_variants')
export class GroceryVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  sku: string;

  @Column({ default: 0 })
  inventory: number;

  @ManyToOne(() => GroceryProduct, product => product.variants)
  product: GroceryProduct;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}