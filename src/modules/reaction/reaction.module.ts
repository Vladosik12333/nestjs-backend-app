import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { ReactionProvider } from './reaction.provider';
import { PostsModule } from '../posts/posts.module';
import { ReactionMapper } from './reaction.mapper';

@Module({
  imports: [PostsModule],
  controllers: [ReactionController],
  providers: [ReactionService, ReactionMapper, ...ReactionProvider],
  exports: [ReactionService, ReactionMapper, ...ReactionProvider],
})
export class ReactionModule {}
