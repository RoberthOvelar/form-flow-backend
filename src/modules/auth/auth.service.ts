import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ReturnTokenDto } from './dto/return-token';

@Injectable()
export class AuthService {
  //await this.jwtService.signAsync({ email: 'teste', sub: 1 })
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnTokenDto> {
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

    return Object.assign(new ReturnTokenDto(), {
      accessToken: await this.jwtService.signAsync({
        email: result.email,
        sub: result._id,
      }),
    });
  }
}
