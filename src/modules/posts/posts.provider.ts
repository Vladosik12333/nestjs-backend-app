import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';
import { PostsMapper } from './posts.mapper';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
  {
    provide: PostsMapper,
    useClass: PostsMapper,
  },
];
