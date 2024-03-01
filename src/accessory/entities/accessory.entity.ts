import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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

  @Column()
  price: number;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.accessory, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
