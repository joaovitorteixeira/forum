import User from 'src/users/entity/users.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => User, (user) => user.posts, {
    cascade: ['remove'],
  })
  @JoinTable()
  likes: User[];

  @BeforeInsert()
  async setCreatedAt() {
    this.createdAt = new Date();
  }
}
