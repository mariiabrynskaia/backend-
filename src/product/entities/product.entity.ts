// scooters
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

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  speed: number;

  @Column()
  distance: number;

  @Column()
  battery: number;

  @Column()
  weight: number;

  @Column()
  payload: string;

  @Column()
  charging_time: number;

  @Column()
  number_of_batteries: string;

  @Column()
  motor_power: number;

  @Column()
  power_output: number;

  @Column()
  incline: number;

  @Column()
  amortization: string;

  @Column()
  safety_light: string;

  @Column()
  atmosphere_light: string;

  @Column()
  price: number;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
