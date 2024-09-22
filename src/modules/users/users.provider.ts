import { User } from './users.entity';
import { USER_REPOSITORY } from '../../core/constants/providers';
import { UserMapper } from './users.mapper';

export const usersProviders = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: UserMapper, useClass: UserMapper },
];
