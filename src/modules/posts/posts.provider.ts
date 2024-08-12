import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';

export const PostsProviders = [
  {
    useValue: Post,
    provide: POST_REPOSITORY,
  },
];
