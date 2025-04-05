import { IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  variantId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}