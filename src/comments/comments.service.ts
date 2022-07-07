import { ForbiddenException, Injectable } from '@nestjs/common';
import Post from '../posts/entity/posts.entity';
import User from '../users/entity/users.entity';
import CreateCommentDto from './dto/create-comment.dto';
import Comment from './entity/comments.entity';

@Injectable()
export class CommentsService {
  constructor() {}

  /**
   * Create a comment for a post
   * @param comment Comment to create
   * @param user User who creates the comment
   * @returns Created comment
   */
  async create(comment: CreateCommentDto, user: User): Promise<Comment> {
    const newComment = new Comment();

    newComment.text = comment.text;
    newComment.user = user;
    newComment.post = await Post.findOneBy({ id: comment.postId });
    newComment.parent = comment.commentId
      ? await Comment.findOneBy({ id: comment.commentId })
      : null;

    return newComment.save();
  }

  /**
   * Delete a comment
   * @param commentId Comment id to delete
   */
  async delete(commentId: number, user: User) {
    const comment = await Comment.findOneBy({ id: commentId });

    if (comment.userId !== user.id)
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );

    await comment.remove();
  }
}
