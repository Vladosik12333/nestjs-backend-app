import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { UserMapper } from './users.mapper';

@Module({
  providers: [UsersService, UserMapper, ...usersProviders],
  exports: [UsersService, UserMapper, ...usersProviders],
})
export class UsersModule {}
