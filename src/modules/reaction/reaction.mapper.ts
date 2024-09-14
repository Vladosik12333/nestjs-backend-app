import { Injectable } from '@nestjs/common';
import { Reaction } from './reaction.entity';
import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionMapper {
  constructor() {}

  mapToReactionDto(reaction: Reaction): ReactionDto {
    const reactionDto = new ReactionDto();

    reactionDto.id = reaction.id;
    reactionDto.reactionType = reaction.reactionType;
    reactionDto.createdAt = reaction.createdAt;
    reactionDto.updatedAt = reaction.updatedAt;

    return reactionDto;
  }
}
