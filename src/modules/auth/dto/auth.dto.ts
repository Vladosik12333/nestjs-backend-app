import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthDto {
  @ApiProperty({ description: 'The user' })
  user: UserDto;

  @ApiProperty({ description: 'The user JWT token' })
  token: string;
}
