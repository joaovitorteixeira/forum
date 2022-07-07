import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import User from '../../users/entity/users.entity';
import Post from './posts.entity';

@Entity()
export default class PostLikesUser extends BaseEntity {
  @Column({ primary: true })
  userId: number;

  @Column({ primary: true })
  postId: number;

  @OneToMany(() => Post, (post) => post.likes)
  post: Post;

  @OneToMany(() => User, (user) => user.likes)
  user: User;
}
