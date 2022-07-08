import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lng: string;

  @Column()
  lat: string;
}
