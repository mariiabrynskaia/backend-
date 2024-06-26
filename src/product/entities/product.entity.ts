// scooters
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CartItemEntity } from 'src/cart/entities/cart-item.entity';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

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
  battery: string;

  @Column({ type: 'float', default: 0 })
  weight: number;

  @Column()
  payload: string;

  @Column({ type: 'float', default: 0 })
  charging_time: number;

  @Column()
  number_of_batteries: string;

  @Column()
  motor_power: string;

  @Column()
  power_output: string;

  @Column()
  incline: number;

  @Column()
  amortization: string;

  @Column()
  safety_light: string;

  @Column()
  atmosphere_light: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ApiHideProperty()
  @OneToMany(() => CartItemEntity, (cart) => cart.product)
  cart: CartItemEntity[];
  @ApiHideProperty()
  @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.product)
  orderItems: CartItemEntity[];
}
