import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryProduct } from '../../entities/grocery-product.entity';
import { GroceryCategory } from '../../entities/grocery-category.entity';
import { GroceryVariant } from '../../entities/grocery-variant.entity';
import { GroceryProductController } from './grocery-product.controller';
import { GroceryProductService } from './grocery-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryProduct, GroceryCategory, GroceryVariant])],
  controllers: [GroceryProductController],
  providers: [GroceryProductService],
  exports: [GroceryProductService],
})
export class GroceryProductModule {}
