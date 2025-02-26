import { ReturnUserDto } from '@/modules/user/dtos/return-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnLoginDto {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  user: ReturnUserDto;
}
