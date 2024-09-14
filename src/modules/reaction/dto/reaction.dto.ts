import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ReactionDto {
  @ApiProperty()
  id: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The positive or negative reaction',
  })
  reactionType: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
