import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import CreateCommentDto from './dto/create-comment.dto';
import Comment from './entity/comments.entity';

@Controller('comments')
@ApiTags('comments')
export default class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('create')
  @ApiBody({
    type: CreateCommentDto,
    description: 'Comment to create',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async create(
    @Req() req,
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(comment, req.user);
  }
}
