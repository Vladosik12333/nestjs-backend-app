import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Table
export class Reaction extends Model<Reaction> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID, allowNull: false })
  postId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  reactionType: boolean;
}
