import { Inject, Injectable } from '@nestjs/common';
import { USER_MAPPER } from '../../core/constants/providers';
import { UserMapper } from '../users/users.mapper';
import { Post } from './posts.entity';
import { PostDto } from './dto/post.dto';
import { PostWithUserDto } from './dto/postWithUser.dto';

@Injectable()
export class PostsMapper {
  constructor(@Inject(USER_MAPPER) private userMapper: UserMapper) {}

  mapToPostDto(post: Post): PostDto {
    const postDto = new PostDto();

    postDto.id = post.id;
    postDto.title = post.title;
    postDto.body = post.body;
    postDto.createdAt = post.createdAt;
    postDto.updatedAt = post.updatedAt;

    return postDto;
  }

  mapToPostWithUserDto(post: Post): PostWithUserDto {
    const postDto = new PostWithUserDto();

    postDto.id = post.id;
    postDto.title = post.title;
    postDto.body = post.body;
    postDto.createdAt = post.createdAt;
    postDto.updatedAt = post.updatedAt;

    const userDto = this.userMapper.mapToUserDto(post.user);

    postDto.user = userDto;

    return postDto;
  }

  mapAllToPostDto(posts: Array<Post>): Array<PostDto> {
    const mappedPosts = posts.map(this.mapToPostDto, this);

    return mappedPosts;
  }

  mapAllToPostWithUserDto(posts: Array<Post>): Array<PostWithUserDto> {
    const mappedPosts = posts.map(this.mapToPostWithUserDto, this);

    return mappedPosts;
  }
}
