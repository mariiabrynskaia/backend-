import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Cart } from './cart.entity';
import { AccessoryEntity } from 'src/accessory/entities/accessory.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  Count: number;

  @Column({ type: 'float', default: 0 })
  cartPrice: number;

  @ManyToOne(() => ProductEntity, (product) => product.cart)
  @JoinColumn()
  product: ProductEntity;

  // @ManyToOne(() => AccessoryEntity, (accessory) => accessory.cart)
  // @JoinColumn()
  // accessory: AccessoryEntity;

  @ManyToOne(() => Cart, (cart) => cart.CartItems)
  cart: Cart;
}
