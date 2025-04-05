import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}