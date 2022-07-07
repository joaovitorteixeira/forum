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

  @Column({
    nullable: true,
  })
  commentsId: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentsId' })
  @TreeChildren()
  comments: Comment[];

  @BeforeInsert()
  async setCreatedAt() {
    this.createdAt = new Date();
  }
}
