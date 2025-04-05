import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateVariantDto {
  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  inventory?: number;
}