import { ApiHideProperty } from '@nestjs/swagger';
import { AccessoryEntity } from 'src/accessory/entities/accessory.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  // CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ApiHideProperty()
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @ApiHideProperty()
  @OneToMany(() => AccessoryEntity, (accessory) => accessory.category)
  accessory: AccessoryEntity[];
}
