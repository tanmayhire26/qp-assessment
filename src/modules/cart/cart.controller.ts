import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { User } from '../../entities/user.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@GetUser() user: User) {
    return this.cartService.getCart(user);
  }

  @Post('items')
  addToCart(@GetUser() user: User, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user, addToCartDto);
  }

  @Put('items/:id')
  updateCartItem(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(user, id, updateCartItemDto);
  }

  @Delete('items/:id')
  removeCartItem(@GetUser() user: User, @Param('id') id: number) {
    return this.cartService.removeCartItem(user, id);
  }

  @Delete()
  clearCart(@GetUser() user: User) {
    return this.cartService.clearCart(user);
  }
}