import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostLikesUser from './entity/post-likes-user.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post, PostLikesUser])],
  controllers: [PostsController],
})
export class PostsModule {}
