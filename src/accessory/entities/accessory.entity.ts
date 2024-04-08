import {
  Any,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';

@Entity('accessory')
export class AccessoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.accessory, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
