import { User } from '../../modules/users/users.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { SEQUELIZE } from '../constants/providers';
import { Post } from '../../modules/posts/posts.entity';
import { Reaction } from '../../modules/reaction/reaction.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        host: configService.get<string>('DB_HOST'),
        port: Number.parseInt(configService.get<string>('DB_PORT')),
        dialect: 'postgres',
      });

      sequelize.addModels([User, Post, Reaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
