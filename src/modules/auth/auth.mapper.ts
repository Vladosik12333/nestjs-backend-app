import { Inject, Injectable } from '@nestjs/common';
import { AuthInterface } from './interfaces/AuthInterface';
import { AuthDto } from './dto/auth.dto';
import { USER_MAPPER } from '../../core/constants/providers';
import { UserMapper } from '../users/users.mapper';

@Injectable()
export class AuthMapper {
  constructor(@Inject(USER_MAPPER) private userMapper: UserMapper) {}

  mapToAuthDto(auth: AuthInterface): AuthDto {
    const authDto = new AuthDto();

    const userDto = this.userMapper.mapToUserDto(auth.user);
    authDto.user = userDto;
    authDto.token = auth.token;

    return authDto;
  }
}
