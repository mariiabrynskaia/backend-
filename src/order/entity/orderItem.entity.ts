import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne(() => Product, (product) => product.orderItem)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.OrderItems)
  order: Order;
}
