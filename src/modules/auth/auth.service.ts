import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/return-token';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReturnUserDto } from '../user/dtos/return-user.dto';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const result = await this.userService.findByEmail(loginDto.email);

    if (!result) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const isValidPassword = await argon2.verify(
      result.password,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const user = this.mapper.map(result, User, ReturnUserDto);

    return Object.assign(new ReturnLoginDto(), {
      accessToken: await this.jwtService.signAsync({
        email: result.email,
        sub: result._id,
      }),
      user,
    });
  }
}
