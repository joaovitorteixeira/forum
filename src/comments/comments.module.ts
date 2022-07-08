import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentsController from './comments.controller';
import { CommentsService } from './comments.service';
import Comment from './entity/comments.entity';

@Module({
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
})
export class CommentsModule {}
