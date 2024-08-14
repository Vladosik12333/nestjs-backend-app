import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @ApiProperty({ description: 'The user name', minimum: 3, maximum: 10 })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The user email address' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @ApiProperty({ description: 'The user password', minimum: 6, maximum: 18 })
  password: string;
}
