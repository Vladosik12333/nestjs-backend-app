import { Post } from './posts.entity';
import { POST_REPOSITORY } from '../../core/constants/providers';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
