import {
  Body,
  Controller,
  Delete,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetUser from '../Util/Decorator/get-user.decorator';
import UserTermsConditionsUtil from '../Util/Decorator/user-terms-conditions.util';
import CreatePostDto from './dto/create-post.dto';
import LikePostDto from './dto/like-post.dto';
import PaginationPostDto from './dto/pagination-post.dto';
import ReadAllPostDto from './dto/read-all-post.dto';
import ReadPostDto from './dto/read-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@UsePipes(UserTermsConditionsUtil)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('create')
  @ApiBody({
    type: CreatePostDto,
    description: 'The post to be created',
  })
  @ApiCreatedResponse({
    description: 'The post has been created',
    type: ReadPostDto,
  })
  async create(@GetUser() user, @Body() post: CreatePostDto) {
    return this.postService.create(post, user);
  }

  @Post(':id/like')
  @ApiNoContentResponse({
    description: 'The post has been liked',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async like(@GetUser() user, @Param() post: LikePostDto) {
    await this.postService.like(post.id, user);
  }

  @Delete(':id/like')
  @ApiNoContentResponse({
    description: 'The post has been like removed',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlike(@GetUser() user, @Param() post: LikePostDto) {
    await this.postService.removeLike(post.id, user);
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of posts',
    type: PaginationPostDto,
  })
  async readAll(@Body() param: ReadAllPostDto, @GetUser() _user) {
    return this.postService.readPost(param);
  }
}
