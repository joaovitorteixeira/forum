import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import User from '../../users/entity/users.entity';
import Post from './posts.entity';

@Entity()
export default class PostLikesUser extends BaseEntity {
  @Column({ primary: true })
  userId: number;

  @Column({ primary: true })
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
