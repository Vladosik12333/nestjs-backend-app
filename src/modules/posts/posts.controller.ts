import {
  Body,
  Controller,
  Delete,
  Get,
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
import { PostsMapper } from './posts.mapper';
import { PostWithUserDto } from './dto/postWithUser.dto';
import { PostWithReactionsDto } from './dto/postWithReactions.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsMapper: PostsMapper,
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

  @ApiOkResponse({
    description: 'All posts',
    type: [PostWithReactionsDto],
  })
  @Get()
  async findAllPosts(): Promise<Array<PostWithReactionsDto>> {
    const posts = await this.postsService.findAllPosts();

    const mappedPosts = this.postsMapper.mapAllToPostWithReactionsDto(posts);

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

    const mappedPost = this.postsMapper.mapToPostWithReactionsDto(post);

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
