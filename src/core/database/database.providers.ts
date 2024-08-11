import { User } from '../../modules/users/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { SEQUELIZE } from '../constants/providers';

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

      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
