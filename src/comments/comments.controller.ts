import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import CreateCommentDto from './dto/create-comment.dto';
import DeleteCommentDto from './dto/delete-comment.dto';
import ReadCommentDto from './dto/read-comment';
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
  @ApiCreatedResponse({
    type: ReadCommentDto,
    description: 'The comment has been created',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async create(
    @Req() req,
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(comment, req.user);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The comment has been deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async delete(@Param() param: DeleteCommentDto, @Req() req) {
    await this.commentsService.delete(param, req.user);
  }
}
