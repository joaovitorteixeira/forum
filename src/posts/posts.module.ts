import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '../tags/tags.module';
import PostLikesUser from './entity/post-likes-user.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [],
  controllers: [PostsController],
})
export class PostsModule {}
