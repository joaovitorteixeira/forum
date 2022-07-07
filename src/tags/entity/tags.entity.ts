import {
  BaseEntity,
  BeforeInsert,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import Post from '../../posts/entity/posts.entity';

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @BeforeInsert()
  lowerCaseName() {
    this.name = this.name.toLowerCase();
  }
}
