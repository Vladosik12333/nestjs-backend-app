import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @ApiProperty()
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'The title of the post',
    minimum: 4,
    maximum: 20,
  })
  title: string;

  @IsString()
  @ApiProperty({ description: 'The description of the post' })
  body: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
