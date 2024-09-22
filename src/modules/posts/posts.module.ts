import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.provider';
import { UsersModule } from '../users/users.module';
import { PostsMapper } from './posts.mapper';

@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostsService, PostsMapper, ...postsProviders],
  exports: [PostsService, PostsMapper, ...postsProviders],
})
export class PostsModule {}
