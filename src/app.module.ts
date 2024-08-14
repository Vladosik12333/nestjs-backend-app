import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
