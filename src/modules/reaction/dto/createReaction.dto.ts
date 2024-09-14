import { ApiProperty, PickType } from '@nestjs/swagger';
import { ReactionDto } from './reaction.dto';
import { IsUUID } from 'class-validator';

export class CreateReactionDto extends PickType(ReactionDto, ['reactionType']) {
  @IsUUID()
  @ApiProperty()
  postId: string;
}
