import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName?: string;
}
