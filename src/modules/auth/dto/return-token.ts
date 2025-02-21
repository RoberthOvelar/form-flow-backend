import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnTokenDto {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
