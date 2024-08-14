import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'The user name' })
  name: string;
  @ApiProperty({ description: 'The user email' })
  email: string;
  @ApiProperty({ description: 'The user JWT token' })
  token: string;
}
