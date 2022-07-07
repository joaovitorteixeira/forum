import { Exclude } from 'class-transformer';

import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import Post from '../../posts/entity/posts.entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  telephone: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Post, (post) => post.likes)
  likes: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await AuthService.hashPassword(this.password);
  }
}
