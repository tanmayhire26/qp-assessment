import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Cart } from '../entities/cart.entity';
import { GroceryProduct } from '../entities/grocery-product.entity';
import { GroceryCategory } from '../entities/grocery-category.entity';
import { GroceryVariant } from '../entities/grocery-variant.entity';
import { CartItem } from '../entities/cart-item.entity';
import { OrderItem } from '../entities/order-item.entity';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'grocery-ecommerce',
  entities: [
    User,
    Order,
    Cart,
    GroceryProduct,
    GroceryCategory,
    GroceryVariant,
    CartItem,
    OrderItem
  ],
  synchronize: true,
};

export default AppDataSourceOptions;
