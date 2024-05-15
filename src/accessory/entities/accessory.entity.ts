import {
  Any,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { CartItemEntity } from 'src/cart/entities/cart-item.entity';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

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

  // @ApiHideProperty()
  // @OneToMany(() => CartItemEntity, (cart) => cart.accessory)
  // cart: CartItemEntity[];
  // @ApiHideProperty()
  // @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.accessory)
  // orderItems: CartItemEntity[];
}
