import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from '../../entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@GetUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  getUserOrders(@GetUser() user: User) {
    return this.orderService.getUserOrders(user);
  }

  @Get(':id')
  getOrderById(@GetUser() user: User, @Param('id') id: number) {
    return this.orderService.getOrderById(user, id);
  }
}