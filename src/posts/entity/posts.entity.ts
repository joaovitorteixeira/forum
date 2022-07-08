import User from 'src/users/entity/users.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from '../../comments/entity/comments.entity';
import Tag from '../../tags/entity/tags.entity';
import { VirtualColumn } from '../../Util/Constants/virtual-column.util';
import PostLikesUser from './post-likes-user.entity';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  createdAt: Date;

  @VirtualColumn()
  likesCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => User, (user) => user.posts, {
    cascade: ['remove'],
  })
  @JoinTable()
  likes: PostLikesUser;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  async setCreatedAt() {
    this.createdAt = new Date();
  }
}
