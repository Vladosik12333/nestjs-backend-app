import { User } from './users.entity';
import { USER_REPOSITORY } from '../../core/constants/providers';

export const usersProviders = [{ provide: USER_REPOSITORY, useValue: User }];
