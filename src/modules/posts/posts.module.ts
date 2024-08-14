import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsProviders } from './posts.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ...PostsProviders],
})
export class PostsModule {}
