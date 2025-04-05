import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { GroceryVariant } from '../../entities/grocery-variant.entity';
import { User } from '../../entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(GroceryVariant)
    private variantRepository: Repository<GroceryVariant>,
    private cartService: CartService,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      user,
      status: OrderStatus.PENDING,
      totalAmount: 0,
    });

    await this.orderRepository.save(order);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const variant = await this.variantRepository.findOneBy({ id: item.variantId });
      if (!variant) {
        throw new NotFoundException(`Variant #${item.variantId} not found`);
      }

      if (variant.inventory < item.quantity) {
        throw new BadRequestException(`Insufficient inventory for variant #${item.variantId}`);
      }

      const orderItem = this.orderItemRepository.create({
        order,
        variant,
        quantity: item.quantity,
        price: variant.price,
      });

      orderItems.push(orderItem);
      totalAmount += variant.price * item.quantity;

      // Update inventory
      variant.inventory -= item.quantity;
      await this.variantRepository.save(variant);
    }

    await this.orderItemRepository.save(orderItems);

    order.totalAmount = totalAmount;
    order.items = orderItems;
    await this.orderRepository.save(order);

    // Clear the cart after successful order
    await this.cartService.clearCart(user);

    return order;
  }

  async getUserOrders(user: User) {
    return this.orderRepository.find({
      where: { user: { id: user.id } },
      relations: ['items', 'items.variant', 'items.variant.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(user: User, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
      relations: ['items', 'items.variant', 'items.variant.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}