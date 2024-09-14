import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { ReactionProvider } from './reaction.provider';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [ReactionController],
  providers: [ReactionService, ...ReactionProvider],
  exports: [ReactionService],
})
export class ReactionModule {}
