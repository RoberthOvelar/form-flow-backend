import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnUserDto {
  @Expose()
  @AutoMap()
  @ApiProperty()
  id: string;

  @Expose()
  @AutoMap()
  @ApiProperty()
  firstName: string;

  @Expose()
  @AutoMap()
  @ApiProperty()
  lastName: string;

  @Expose()
  @AutoMap()
  @ApiProperty()
  email: string;
}
