import { Injectable } from '@nestjs/common';
import User from 'src/users/entity/users.entity';
import CreatePostDto from './dto/create-post.dto';
import Post from './entity/posts.entity';

@Injectable()
export class PostsService {
  constructor() {}

  /**
   * Create a new post on the database
   * @param post New post to be created
   * @param user The user who created the post
   * @returns The created post
   */
  async create(post: CreatePostDto, user: User): Promise<Post> {
    const newPost = new Post();

    newPost.title = post.title;
    newPost.content = post.content;
    newPost.user = user;

    return newPost.save();
  }
}
