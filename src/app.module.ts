import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import Post from './posts/entity/posts.entity';
import { PostsModule } from './posts/posts.module';
import PostLikesUser from './posts/entity/post-likes-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [User, Post, PostLikesUser],
        synchronize: configService.get('SYNCHRONIZE_DATABASE'),
        logging: configService.get('LOGGING_DATABASE'),
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
