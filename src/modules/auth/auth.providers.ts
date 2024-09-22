import { AuthMapper } from './auth.mapper';

export const authProviders = [{ provide: AuthMapper, useClass: AuthMapper }];
