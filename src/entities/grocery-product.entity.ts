import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GroceryCategory } from './grocery-category.entity';
import { GroceryVariant } from './grocery-variant.entity';

@Entity('grocery_products')
export class GroceryProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => GroceryCategory, category => category.products)
  category: GroceryCategory;

  @OneToMany(() => GroceryVariant, variant => variant.product)
  variants: GroceryVariant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}