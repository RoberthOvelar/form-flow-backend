import { IUserCls } from '@/interfaces/i-user-cls';
import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { ClsService } from 'nestjs-cls';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { ReturnUserDto } from './dtos/return-user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clsService: ClsService<IUserCls>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateUserDto): Promise<ReturnUserDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const password = await argon2.hash(dto.password);

    const result = await this.userRepository.create({ ...dto, password });

    return this.mapper.map(result, User, ReturnUserDto);
  }

  async updateProfile(dto: UpdateUserDto): Promise<ReturnUserDto> {
    const userId = this.clsService.get('userId');
    const result = await this.userRepository.update({ _id: userId }, dto);

    return this.mapper.map(result, User, ReturnUserDto);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findProfile(): Promise<ReturnUserDto> {
    const userId = this.clsService.get('userId');
    const result = await this.userRepository.findOne({ _id: userId });

    return this.mapper.map(result, User, ReturnUserDto);
  }
}
