import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequestDto {
  @ApiProperty({ description: 'The user email' })
  email: string;
  @ApiProperty({ description: 'The user password' })
  password: string;
}
