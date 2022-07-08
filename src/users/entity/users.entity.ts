import { Exclude } from 'class-transformer';

import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import Comment from '../../comments/entity/comments.entity';
import Post from '../../posts/entity/posts.entity';
import { TermsConditions } from '../../terms-conditions/entity/terms-conditions.entity';

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

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Post, (post) => post.likes)
  likes: Post[];

  @ManyToMany(() => TermsConditions)
  @JoinTable()
  termsConditions: TermsConditions[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await AuthService.hashPassword(this.password);
  }
}
