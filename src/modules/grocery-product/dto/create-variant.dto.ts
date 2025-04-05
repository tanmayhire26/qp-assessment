import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  size: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  sku: string;

  @IsNumber()
  @IsPositive()
  inventory: number;

  @IsNumber()
  productId: number;
}