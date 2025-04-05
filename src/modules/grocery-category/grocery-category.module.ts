import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryCategory } from '../../entities/grocery-category.entity';
import { GroceryCategoryController } from './grocery-category.controller';
import { GroceryCategoryService } from './grocery-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryCategory])],
  controllers: [GroceryCategoryController],
  providers: [GroceryCategoryService],
  exports: [GroceryCategoryService],
})
export class GroceryCategoryModule {}