import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../users/entity/users.entity';

@Entity()
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lng: string;

  @Column()
  lat: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
