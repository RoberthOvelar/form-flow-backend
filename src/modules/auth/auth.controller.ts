import { AllowAnonymous } from '@/decorators/allow-anonymous.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @AllowAnonymous()
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
