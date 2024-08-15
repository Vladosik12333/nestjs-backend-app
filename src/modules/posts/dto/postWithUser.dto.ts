import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { PostDto } from './post.dto';

export class PostWithUserDto extends PostDto {
  @ApiProperty()
  user: UserDto;
}
