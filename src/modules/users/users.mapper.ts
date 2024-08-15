import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserMapper {
  mapToUserDto(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;

    return userDto;
  }
}
