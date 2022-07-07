import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import Comment from './entity/comments.entity';

@Module({
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}
