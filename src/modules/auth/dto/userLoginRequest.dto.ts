import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRequestDto {
  @ApiProperty({ description: 'The user email' })
  email: string;
  @ApiProperty({ description: 'The user password' })
  password: string;
}
