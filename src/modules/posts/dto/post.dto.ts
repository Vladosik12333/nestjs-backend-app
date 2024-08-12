import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsString()
  body: string;
}
