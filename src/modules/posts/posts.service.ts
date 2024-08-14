import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(@Inject(POST_REPOSITORY) private postsRepository: typeof Post) {}

  async createPost(userId: string, postBody: PostDto): Promise<Post> {
    const post = { userId, ...postBody };

    const newPost = await this.postsRepository.create(post, {
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    return newPost;
  }

  async findAllPosts(): Promise<Array<Post>> {
    const posts = await this.postsRepository.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    return posts;
  }

  async findOnePost(postId: string): Promise<Post> {
    const post = await this.postsRepository.findByPk(postId, {
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return post;
  }

  async updateOnePost(
    postId: string,
    userId: string,
    postBody: PostDto,
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
