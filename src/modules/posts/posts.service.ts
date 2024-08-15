import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(@Inject(POST_REPOSITORY) private postsRepository: typeof Post) {}

  async createPost(userId: string, postBody: CreatePostDto): Promise<Post> {
    const post = { userId, ...postBody };

    const newPost = await this.postsRepository.create(post);

    return newPost;
  }

  async findAllPosts(): Promise<Array<Post>> {
    const posts = await this.postsRepository.findAll({
      include: User,
    });

    return posts;
  }

  async findOnePost(postId: string): Promise<Post> {
    const post = await this.postsRepository.findByPk(postId, {
      include: User,
    });

    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return post;
  }

  async updateOnePost(
    postId: string,
    userId: string,
    postBody: CreatePostDto,
  ): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: postId, userId },
    });

    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    post.set(postBody);

    await post.save();

    return post;
  }

  async deleteOnePost(postId: string, userId: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: postId, userId },
    });

    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    await post.destroy();

    return post;
  }
}
