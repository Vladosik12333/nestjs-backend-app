import { Reaction } from './reaction.entity';
import { REACTION_REPOSITORY } from '../../core/constants/providers';

export const ReactionProvider = [
  {
    provide: REACTION_REPOSITORY,
    useValue: Reaction,
  },
];
