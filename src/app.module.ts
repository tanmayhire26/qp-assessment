import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppDataSourceOptions } from './config/datasource';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { GroceryProductModule } from './modules/grocery-product/grocery-product.module';
import { GroceryCategoryModule } from './modules/grocery-category/grocery-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    AuthModule,
    UserModule,
    CartModule,
    OrderModule,
    GroceryProductModule,
    GroceryCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
