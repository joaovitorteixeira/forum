import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TermsConditionsModule } from './terms-conditions/terms-conditions.module';
import { AddressModule } from './address/address.module';
import { GoogleMapsApiModule } from './google-maps-api/google-maps-api.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('SYNCHRONIZE_DATABASE') === 'true',
        logging: true,
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    TagsModule,
    EventEmitterModule.forRoot(),
    TermsConditionsModule,
    AddressModule,
    GoogleMapsApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
