import { Controller, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(): Promise<User> {
    return this.userService.create();
  }
}
