import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import Post from '../posts/entity/posts.entity';
import CreateTagDto from './dto/create-tag.dto';
import Tag from './entity/tags.entity';

@Injectable()
export class TagsService {
  constructor() {}

  /**
   * Add tags to a post. If tag doesn't exist, it will be created
   * @param post The post to add tags to
   */
  @OnEvent('post.created', { async: true })
  async create(post: CreateTagDto) {
    await Tag.createQueryBuilder('tags')
      .insert()
      .values(post.tags.map((tag) => ({ name: tag })))
      .orIgnore()
      .execute();

    await this.associate(post.postId, post.tags);
  }

  /**
   * Add tags to a post
   * @param postId The id of the post to associate tags to
   * @param tags Array of ids of tags to associate to the post
   */
  private async associate(postId: number, tags: string[]) {
    await Tag.createQueryBuilder('tags')
      .insert()
      .into('post_tags_tag')
      .values(
        tags.map((id) => {
          return {
            postId,
            tagName: id,
          };
        }),
      )
      .orIgnore()
      .execute();
  }
}
