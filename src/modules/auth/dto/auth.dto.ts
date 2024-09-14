import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthResponseDto {
  @ApiProperty({ description: 'The user' })
  user: UserDto;

  @ApiProperty({ description: 'The user JWT token' })
  token: string;
}
