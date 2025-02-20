import { IUserCls } from '@/interfaces/i-user-cls';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { ClsService } from 'nestjs-cls';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clsService: ClsService<IUserCls>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const entity = dto;

    const password = await argon2.hash('12345678');

    return await this.userRepository.create({
      ...entity,
      password,
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getProfile(): Promise<User> {
    const userId = this.clsService.get('userId');
    return await this.userRepository.findOne({ _id: userId });
  }
}
