import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../users/entity/users.entity';

@Entity()
export class TermsConditions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  description: string;

  @Column()
  createdAt: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
