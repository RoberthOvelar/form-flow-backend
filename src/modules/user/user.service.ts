import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';
import { ClsService } from 'nestjs-cls';
import { IUserCls } from '@/interfaces/i-user-cls';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clsService: ClsService<IUserCls>,
  ) {}

  async create() {
    const password = await argon2.hash('12345678');

    return this.userRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'dev@gmail.com',
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
