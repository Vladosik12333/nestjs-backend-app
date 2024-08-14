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
import { Post } from './posts.entity';
import { PostDto } from './dto/post.dto';
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

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The post was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT token not validated',
  })
  @UseGuards(AuthGuard('jwt'))
  @PostMethod()
  async createPost(@Body() postBody: PostDto, @Request() req): Promise<Post> {
    const createdPost = await this.postsService.createPost(
      req.user.id,
      postBody,
    );

    return createdPost;
  }

  @ApiCreatedResponse({
    description: 'All posts',
  })
  @Get()
  async findAllPosts(): Promise<Array<Post>> {
    const posts = await this.postsService.findAllPosts();

    return posts;
  }

  @ApiOkResponse({
    description: 'Found one post by id',
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @Get(':id')
  async findOnePost(@Param('id') id: string): Promise<Post> {
    const post = await this.postsService.findOnePost(id);

    return post;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The post was successfully updated',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT token not validated',
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
    @Body() postBody: PostDto,
    @Request() req,
  ): Promise<Post> {
    const post = await this.postsService.updateOnePost(
      id,
      req.user.id,
      postBody,
    );

    return post;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The post was successfully deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT token not validated',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOnePost(@Param('id') id: string, @Request() req): Promise<Post> {
    const post = await this.postsService.deleteOnePost(id, req.user.id);

    return post;
  }
}
