import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PickType(UserDto, ['name', 'email']) {
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @ApiProperty({ description: 'The user password', minimum: 6, maximum: 18 })
  password: string;
}
