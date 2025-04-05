import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { CartItem } from '../../entities/cart-item.entity';
import { GroceryVariant } from '../../entities/grocery-variant.entity';
import { User } from '../../entities/user.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(GroceryVariant)
    private variantRepository: Repository<GroceryVariant>,
  ) {}

  async getCart(user: User) {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['items', 'items.variant', 'items.variant.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ user });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addToCart(user: User, addToCartDto: AddToCartDto) {
    const cart = await this.getCart(user);
    const variant = await this.variantRepository.findOneBy({ id: addToCartDto.variantId });

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        variant: { id: variant.id },
      },
    });

    if (cartItem) {
      cartItem.quantity += addToCartDto.quantity;
    } else {
      cartItem = this.cartItemRepository.create({
        cart,
        variant,
        quantity: addToCartDto.quantity,
      });
    }

    return this.cartItemRepository.save(cartItem);
  }

  async updateCartItem(user: User, itemId: number, updateCartItemDto: UpdateCartItemDto) {
    const cart = await this.getCart(user);
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cart: { id: cart.id } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async removeCartItem(user: User, itemId: number) {
    const cart = await this.getCart(user);
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cart: { id: cart.id } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(user: User) {
    const cart = await this.getCart(user);
    await this.cartItemRepository.delete({ cart: { id: cart.id } });
  }
}