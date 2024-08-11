import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants/providers';

export const usersProviders = [{ provide: USER_REPOSITORY, useValue: User }];
