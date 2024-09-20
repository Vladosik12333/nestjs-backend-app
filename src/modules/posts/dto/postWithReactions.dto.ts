import { PostWithUserDto } from './postWithUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PostWithReactionsDto extends PostWithUserDto {
  @ApiProperty({ description: 'Total count of the positive reactions' })
  @IsNumber()
  positiveReactions: number;

  @ApiProperty({ description: 'Total count of the negative reactions' })
  @IsNumber()
  negativeReactions: number;
}
