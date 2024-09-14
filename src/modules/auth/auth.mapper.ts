import { Inject, Injectable } from '@nestjs/common';
import { AuthInterface } from './interfaces/AuthInterface';
import { AuthResponseDto } from './dto/auth.dto';
import { USER_MAPPER } from '../../core/constants/providers';
import { UserMapper } from '../users/users.mapper';

@Injectable()
export class AuthMapper {
  constructor(@Inject(USER_MAPPER) private userMapper: UserMapper) {}

  mapToAuthResponseDto(auth: AuthInterface): AuthResponseDto {
    const authResponseDto = new AuthResponseDto();

    const userDto = this.userMapper.mapToUserDto(auth.user);
    authResponseDto.user = userDto;
    authResponseDto.token = auth.token;

    return authResponseDto;
  }
}
