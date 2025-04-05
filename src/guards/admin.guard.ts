import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This assumes you have a user object attached to the request via authentication middleware

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Admin access required');
    }

    return true;
  }
}