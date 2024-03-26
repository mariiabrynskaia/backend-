import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entity/order.entity';
import { Cart } from '../../cart/entity/cart.entity';
import { Role } from '../role/role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column('date')
  birthday: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'set',
    enum: Role,
    default: [Role.USER],
  })
  roles: Role[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
