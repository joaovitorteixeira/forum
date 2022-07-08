import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import CreateCommentDto from './dto/create-comment.dto';
import DeleteCommentDto from './dto/delete-comment.dto';
import PaginationCommentDto from './dto/pagination-comment.dto';
import ReadAllCommentDto from './dto/read-all-comment.dto';
import ReadCommentDto from './dto/read-comment';
import Comment from './entity/comments.entity';

@Controller('comments')
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth('Authorization')
  async delete(@Param() param: DeleteCommentDto, @Req() req) {
    await this.commentsService.delete(param, req.user);
  }

  @Get(':page/:limit/:value/:field')
  @ApiOkResponse({
    type: PaginationCommentDto,
    description: 'The comments',
  })
  async getComments(@Param() param: ReadAllCommentDto) {
    return this.commentsService.getComments(param);
  }
}
