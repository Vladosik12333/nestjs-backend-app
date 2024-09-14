import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/createReaction.dto';
import { ReactionDto } from './dto/reaction.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { REACTION_MAPPER } from '../../core/constants/providers';
import { ReactionMapper } from './reaction.mapper';

@ApiTags('reactions')
@Controller('reaction')
export class ReactionController {
  constructor(
    private reactionService: ReactionService,
    @Inject(REACTION_MAPPER) private reactionMapper: ReactionMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The reaction was successfully created',
    type: ReactionDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authorized',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiNotFoundResponse({
    description: 'The post with with such id not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReaction(
    @Body() body: CreateReactionDto,
    @Req() req,
  ): Promise<ReactionDto> {
    const reaction = await this.reactionService.createReaction(
      body,
      req.user.id,
    );

    const mappedReaction = this.reactionMapper.mapToReactionDto(reaction);

    return mappedReaction;
  }
}
