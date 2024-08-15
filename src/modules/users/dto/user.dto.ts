import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @ApiProperty({ description: 'The user name', minimum: 3, maximum: 10 })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The user email address' })
  email: string;
}
