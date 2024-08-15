import { Post } from './posts.entity';
import { POST_REPOSITORY, POSTS_MAPPER } from '../../core/constants/providers';
import { PostsMapper } from './posts.mapper';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
  {
    provide: POSTS_MAPPER,
    useClass: PostsMapper,
  },
];
