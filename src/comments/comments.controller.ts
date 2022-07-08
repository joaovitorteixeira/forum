import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
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
import GetUser from '../Util/Decorator/get-user.decorator';
import UserTermsConditionsUtil from '../Util/Decorator/user-terms-conditions.util';
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
@ApiBearerAuth('Authorization')
@UsePipes(UserTermsConditionsUtil)
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
  async create(
    @GetUser() user,
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(comment, user);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The comment has been deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() param: DeleteCommentDto, @GetUser() user) {
    await this.commentsService.delete(param, user);
  }

  @Get(':page/:limit/:value/:field')
  @ApiOkResponse({
    type: PaginationCommentDto,
    description: 'The comments',
  })
  async getComments(@Param() param: ReadAllCommentDto, @GetUser() _user) {
    return this.commentsService.getComments(param);
  }
}
