import { User } from '../../users/users.entity';

export interface AuthInterface {
  user: User;
  token: string;
}
