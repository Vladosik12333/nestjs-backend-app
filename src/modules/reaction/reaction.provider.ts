import { Reaction } from './reaction.entity';
import {
  REACTION_MAPPER,
  REACTION_REPOSITORY,
} from '../../core/constants/providers';
import { ReactionMapper } from './reaction.mapper';

export const ReactionProvider = [
  {
    provide: REACTION_REPOSITORY,
    useValue: Reaction,
  },
  {
    provide: REACTION_MAPPER,
    useClass: ReactionMapper,
  },
];
