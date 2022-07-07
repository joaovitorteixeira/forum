import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '../../posts/entity/posts.entity';

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @BeforeInsert()
  lowerCaseName() {
    this.name = this.name.toLowerCase();
  }
}
