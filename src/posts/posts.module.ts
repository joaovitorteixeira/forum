import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
