import { AuthMapper } from './auth.mapper';
import { AUTH_MAPPER } from '../../core/constants/providers';

export const authProviders = [{ provide: AUTH_MAPPER, useClass: AuthMapper }];
