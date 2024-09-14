import { Inject, Injectable } from '@nestjs/common';
import { REACTION_REPOSITORY } from '../../core/constants/providers';
import { Reaction } from './reaction.entity';
import { CreateReactionDto } from './dto/createReaction.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class ReactionService {
  constructor(
    @Inject(REACTION_REPOSITORY) private reactionRepository: typeof Reaction,
    private postService: PostsService,
  ) {}

  async createReaction(
    body: CreateReactionDto,
    userId: string,
  ): Promise<Reaction> {
    await this.postService.findOnePost(body.postId);

    const oldReaction = await this.reactionRepository.findOne({
      where: { userId, postId: body.postId },
    });

    if (oldReaction) {
      await oldReaction.destroy();
    }

    const reaction = await this.reactionRepository.create({
      ...body,
      userId: userId,
    });

    return reaction;
  }
}
