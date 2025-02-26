import { AllowAnonymous } from '@/decorators/allow-anonymous.decorator';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AllowAnonymous()
  @ApiCreatedResponse({ type: ReturnUserDto })
  async create(@Body() dto: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.create(dto);
  }

  @Get('/me')
  @ApiOkResponse({ type: ReturnUserDto })
  async findProfile(): Promise<ReturnUserDto> {
    return await this.userService.findProfile();
  }

  @Patch('/me')
  @ApiOkResponse({ type: ReturnUserDto })
  async updateProfile(@Body() dto: UpdateUserDto): Promise<ReturnUserDto> {
    return await this.userService.updateProfile(dto);
  }
}
