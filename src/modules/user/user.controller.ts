import { Controller, Get, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { AllowAnonymous } from '@/decorators/allow-anonymous.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AllowAnonymous()
  async create(): Promise<User> {
    return this.userService.create();
  }

  @Get('/me')
  async getProfile(): Promise<User> {
    return await this.userService.getProfile();
  }
}
