import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { getPostgresConfig } from './configs/postgres.config';
import { ProductModule } from './product/product.module';
import { AccessoryModule } from './accessory/accessory.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'tmp01',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CategoryModule,
    CategoryModule,
    ProductModule,
    AccessoryModule,
    AuthModule,
    CartModule,
    OrderModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
