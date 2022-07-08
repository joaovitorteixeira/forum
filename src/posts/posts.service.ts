import { ForbiddenException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import User from 'src/users/entity/users.entity';
import Pagination from '../Util/Pagination/Pagination';
import CreatePostDto from './dto/create-post.dto';
import ReadAllPostDto from './dto/read-all-post.dto';
import PostLikesUser from './entity/post-likes-user.entity';
import Post from './entity/posts.entity';

@Injectable()
export class PostsService {
  constructor(private eventEmitter: EventEmitter2) {}

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

    const createdPost = await newPost.save();
    this.eventEmitter.emit('post.created', {
      postId: createdPost.id,
      tags: post.tags,
    });

    return createdPost;
  }

  /**
   *  Try to like a post
   * @param postId The id of the post to be liked
   * @param user The user who liked the post
   * @returns If post exists and doesn't already have the user liked it, it will be liked
   */
  async like(postId: number, user: User): Promise<PostLikesUser> {
    const post = await Post.createQueryBuilder('post')
      .leftJoinAndMapOne(
        'post.likes',
        PostLikesUser,
        'likes',
        'likes.postId = :postId',
        { postId: postId },
      )
      .where('likes.userId = :userId', { userId: user.id })
      .getOne();

    if (post) throw new ForbiddenException('User already liked this post');

    const newLike = new PostLikesUser();

    newLike.userId = user.id;
    newLike.postId = postId;

    return newLike.save();
  }

  /**
   * Try to unlike a post
   * @param postId The id of the post to remove the like from
   * @param user The user who wants to remove the like
   * @returns If post exists and has the user liked it, it will be removed
   */
  async removeLike(postId: number, user: User): Promise<PostLikesUser> {
    const post = await Post.createQueryBuilder('post')
      .leftJoinAndMapOne(
        'post.likes',
        PostLikesUser,
        'likes',
        'likes.postId = :postId',
        { postId: postId },
      )
      .where('likes.userId = :userId', { userId: user.id })
      .getOne();

    if (!post) throw new ForbiddenException('User did not like this post');

    const like = post.likes as PostLikesUser;

    return like.remove();
  }

  /**
   * Paginated list of posts
   * @param param The parameters to filter the posts
   * @returns The posts filtered by the parameters
   */
  async readPost(param: ReadAllPostDto) {
    const query = new Pagination(Post, 'createdAt').pageBuilder(
      Post.createQueryBuilder('post')
        .innerJoinAndMapOne('post.user', User, 'user', 'user.id = post.userId')
        .leftJoinAndSelect('post.likes', 'likes'),
      param,
    );

    return await query;
  }
}
