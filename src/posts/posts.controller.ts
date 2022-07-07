import {
  Body,
  Controller,
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
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreatePostDto from './dto/create-post.dto';
import LikePostDto from './dto/like-post.dto';
import ReadPostDto from './dto/read-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('create')
  @ApiBody({
    type: CreatePostDto,
    description: 'The post to be created',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({
    description: 'The post has been created',
    type: ReadPostDto,
  })
  async create(@Req() req, @Body() post: CreatePostDto): Promise<ReadPostDto> {
    return this.postService.create(post, req.user);
  }

  @Post(':id/like')
  @ApiNoContentResponse({
    description: 'The post has been liked',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async like(@Req() req, @Param() post: LikePostDto) {
    await this.postService.like(post.id, req.user);
  }

  @Post(':id/unlike')
  @ApiNoContentResponse({
    description: 'The post has been like removed',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async unlike(@Req() req, @Param() post: LikePostDto) {
    await this.postService.removeLike(post.id, req.user);
  }
}
