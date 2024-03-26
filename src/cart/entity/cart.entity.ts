import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  getTotalPrice() {
    if (this.cartItems == null) {
      return 0;
    }
    let sum = 0;
    this.cartItems.forEach((a) => (sum += a.product.price));
    return sum;
  }
}
