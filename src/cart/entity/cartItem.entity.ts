import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Quantity: number;

  @OneToOne(() => Product, (product) => product.cartItem)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
