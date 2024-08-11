import { User } from '../../users/user.entity';

export interface UserResponseDto {
  name: string;
  email: string;
  token: string;
}
