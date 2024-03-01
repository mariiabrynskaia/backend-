import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AccessoryService } from './accessory.service';
import { AccessoryController } from './accessory.controller';
import { AccessoryEntity } from './entities/accessory.entity';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AccessoryEntity, CategoryEntity]),
    CategoryModule,
  ],
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}
