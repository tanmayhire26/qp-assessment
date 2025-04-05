import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { UserService } from '../../src/modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  try {
    const admin = await userService.createAdmin({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Failed to create admin user:', error.message);
  }

  await app.close();
}

bootstrap(); 
