import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create() {
    return this.userRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'aaa@gmail.com',
      password: '12345678',
    });
  }
}
