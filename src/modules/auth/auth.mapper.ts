import { Injectable } from '@nestjs/common';
import { AuthInterface } from './interfaces/AuthInterface';
import { AuthResponseDto } from './dto/auth.dto';
import { UserMapper } from '../users/users.mapper';

@Injectable()
export class AuthMapper {
  constructor(private userMapper: UserMapper) {}

  mapToAuthResponseDto(auth: AuthInterface): AuthResponseDto {
    const authResponseDto = new AuthResponseDto();

    const userDto = this.userMapper.mapToUserDto(auth.user);
    authResponseDto.user = userDto;
    authResponseDto.token = auth.token;

    return authResponseDto;
  }
}
