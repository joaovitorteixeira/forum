import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import Post from '../../posts/entity/posts.entity';
import User from '../../users/entity/users.entity';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  text: string;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @TreeChildren()
  comments: Comment[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Comment;

  @BeforeInsert()
  async setCreatedAt() {
    this.createdAt = new Date();
  }
}
