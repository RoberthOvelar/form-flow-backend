import { AllowAnonymous } from '@/decorators/allow-anonymous.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnTokenDto } from './dto/return-token';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @AllowAnonymous()
  @ApiOkResponse({ type: ReturnTokenDto })
  async create(@Body() loginDto: LoginDto): Promise<ReturnTokenDto> {
    return await this.authService.login(loginDto);
  }
}
