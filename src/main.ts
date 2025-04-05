import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply JwtAuthGuard globally
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
