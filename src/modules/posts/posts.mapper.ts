import { Injectable } from '@nestjs/common';
import { UserMapper } from '../users/users.mapper';
import { Post } from './posts.entity';
import { PostDto } from './dto/post.dto';
import { PostWithReactionsDto } from './dto/postWithReactions.dto';

@Injectable()
export class PostsMapper {
  constructor(private userMapper: UserMapper) {}

  mapToPostDto(post: Post): PostDto {
    const postDto = new PostDto();

    postDto.id = post.id;
    postDto.title = post.title;
    postDto.body = post.body;
    postDto.createdAt = post.createdAt;
    postDto.updatedAt = post.updatedAt;

    return postDto;
  }

  mapToPostWithReactionsDto(post: Post): PostWithReactionsDto {
    const postDto = new PostWithReactionsDto();

    postDto.id = post.id;
    postDto.title = post.title;
    postDto.body = post.body;
    postDto.createdAt = post.createdAt;
    postDto.updatedAt = post.updatedAt;
    postDto.positiveReactions = Number(post.dataValues?.positiveReactions) ?? 0;
    postDto.negativeReactions = Number(post.dataValues?.negativeReactions) ?? 0;

    const userDto = this.userMapper.mapToUserDto(post.user);
    postDto.user = userDto;

    return postDto;
  }

  mapAllToPostDto(posts: Array<Post>): Array<PostDto> {
    const mappedPosts = posts.map(this.mapToPostDto, this);

    return mappedPosts;
  }

  mapAllToPostWithReactionsDto(
    posts: Array<Post>,
  ): Array<PostWithReactionsDto> {
    const mappedPosts = posts.map(this.mapToPostWithReactionsDto, this);

    return mappedPosts;
  }
}
