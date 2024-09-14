import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post as PostMethod,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { POSTS_MAPPER } from '../../core/constants/providers';
import { PostsMapper } from './posts.mapper';
import { PostWithUserDto } from './dto/postWithUser.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    @Inject(POSTS_MAPPER) private postsMapper: PostsMapper,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The post was successfully created',
    type: PostDto,
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authorized',
  })
  @UseGuards(AuthGuard('jwt'))
  @PostMethod()
  async createPost(
    @Body() postBody: CreatePostDto,
    @Request() req,
  ): Promise<PostDto> {
    const post = await this.postsService.createPost(req.user.id, postBody);

    const mappedPost = this.postsMapper.mapToPostDto(post);

    return mappedPost;
  }

  @ApiCreatedResponse({
    description: 'All posts',
    type: [PostWithUserDto],
  })
  @Get()
  async findAllPosts(): Promise<Array<PostWithUserDto>> {
    const posts = await this.postsService.findAllPosts();

    const mappedPosts = this.postsMapper.mapAllToPostWithUserDto(posts);

    return mappedPosts;
  }

  @ApiOkResponse({
    description: 'Found one post by id',
    type: PostWithUserDto,
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @Get(':id')
  async findOnePost(@Param('id') id: string): Promise<PostWithUserDto> {
    const post = await this.postsService.findOnePost(id);

    const mappedPost = this.postsMapper.mapToPostWithUserDto(post);

    return mappedPost;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The post was successfully updated',
    type: PostDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authorized',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOnePost(
    @Param('id') id: string,
    @Body() postBody: CreatePostDto,
    @Request() req,
  ): Promise<PostDto> {
    const post = await this.postsService.updateOnePost(
      id,
      req.user.id,
      postBody,
    );

    const mappedPost = this.postsMapper.mapToPostDto(post);

    return mappedPost;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The post was successfully deleted',
    type: PostDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authorized',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOnePost(
    @Param('id') id: string,
    @Request() req,
  ): Promise<PostDto> {
    const post = await this.postsService.deleteOnePost(id, req.user.id);

    const mappedPost = this.postsMapper.mapToPostDto(post);

    return mappedPost;
  }
}
