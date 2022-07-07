import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
}
