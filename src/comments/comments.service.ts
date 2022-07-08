import { ForbiddenException, Injectable } from '@nestjs/common';
import Post from '../posts/entity/posts.entity';
import User from '../users/entity/users.entity';
import Pagination from '../Util/Pagination/Pagination';
import CreateCommentDto from './dto/create-comment.dto';
import DeleteCommentDto from './dto/delete-comment.dto';
import ReadAllCommentDto from './dto/read-all-comment.dto';
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
   * @param param Comment id to delete
   */
  async delete(param: DeleteCommentDto, user: User) {
    const comment = await Comment.findOneBy({ id: param.id });

    if (comment.userId !== user.id)
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );

    await comment.remove();
  }
  /**
   * Get all comments for a post or a comment
   * @param param Pagination and filter parameters
   * @returns Paginated comments
   */
  async getComments(param: ReadAllCommentDto) {
    const query = Comment.createQueryBuilder('comment');

    if (param.field === 'postId') {
      query
        .where('comment.postId = :postId', { postId: param.value })
        .andWhere('comment.parent IS NULL');
      query.leftJoinAndSelect(
        'comment.comments',
        'comments',
        'comments.parentId IS NULL',
      );
    } else if (param.field === 'commentId') {
      query.where('comment.parentId = :commentId', { commentId: param.value });
      query.leftJoinAndSelect(
        'comment.comments',
        'comments',
        'comments.parentId = comment.id',
      );
    }

    query
      .innerJoinAndSelect('comment.user', 'user')
      .loadAllRelationIds({ relations: ['comments'] });
    const [data, total] = await new Pagination('createdAt').pageBuilder(
      query,
      param,
    );
    return { data, total };
  }
}
