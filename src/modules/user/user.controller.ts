import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')  // This defines the base path
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    const payload = { email: user.email, sub: user.id, role: user.role };
    const { password, ...result } = user;
    
    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }

  @Public()
  @Post('login')  // This adds to the base path
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const { password, ...result } = user;
    
    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }
}
