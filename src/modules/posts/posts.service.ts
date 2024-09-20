import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';
import { User } from '../users/users.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Sequelize } from 'sequelize-typescript';

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
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        {
          model: Reaction,
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'title',
        'body',
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `CASE WHEN "reactions"."reactionType" = true THEN 1 ELSE 0 END`,
            ),
          ),
          'positiveReactions',
        ],
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `CASE WHEN "reactions"."reactionType" = false THEN 1 ELSE 0 END`,
            ),
          ),
          'negativeReactions',
        ],
      ],
      group: [
        'Post.id',
        'Post.title',
        'Post.body',
        'user.id',
        'user.name',
        'user.email',
      ],
    });

    return posts;
  }

  async findOnePost(postId: string): Promise<Post> {
    const post = await this.postsRepository.findByPk(postId, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        {
          model: Reaction,
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'title',
        'body',
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `CASE WHEN "reactions"."reactionType" = true THEN 1 ELSE 0 END`,
            ),
          ),
          'positiveReactions',
        ],
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `CASE WHEN "reactions"."reactionType" = false THEN 1 ELSE 0 END`,
            ),
          ),
          'negativeReactions',
        ],
      ],
      group: [
        'Post.id',
        'Post.title',
        'Post.body',
        'user.id',
        'user.name',
        'user.email',
      ],
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
