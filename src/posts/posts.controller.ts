import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreatePostDto from './dto/create-post.dto';
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
}
