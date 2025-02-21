import { AllowAnonymous } from '@/decorators/allow-anonymous.decorator';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AllowAnonymous()
  @ApiCreatedResponse({ type: ReturnUserDto })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get('/me')
  @ApiOkResponse({ type: ReturnUserDto })
  async getProfile(): Promise<ReturnUserDto> {
    return await this.userService.getProfile();
  }

  @Patch('/me')
  @ApiOkResponse({ type: ReturnUserDto })
  async updateProfile(@Body() dto: UpdateUserDto): Promise<ReturnUserDto> {
    return await this.userService.updateProfile(dto);
  }
}
