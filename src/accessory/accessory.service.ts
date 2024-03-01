import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { AccessoryEntity } from './entities/accessory.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectRepository(AccessoryEntity)
    private accessoryRepository: Repository<AccessoryEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateAccessoryDto,
    image: Express.Multer.File,
  ): Promise<AccessoryEntity> {
    const accessory = new AccessoryEntity();
    accessory.image = image.filename;
    accessory.name = dto.name;
    accessory.description = dto.description;
    accessory.price = dto.price;

    const newAccessory = await this.accessoryRepository.save(accessory);

    const category = await this.categoryRepository.findOne({
      where: { id: dto.id },
      relations: ['accessory'],
    });

    category.accessory.push(accessory);

    await this.categoryRepository.save(category);

    return newAccessory;
  }

  async findAll(): Promise<AccessoryEntity[]> {
    return this.accessoryRepository.find();
  }

  async findOne(id: number): Promise<AccessoryEntity> {
    return this.accessoryRepository.findOneBy({ id });
  }

  async findByCategoryId(categoryId: number): Promise<AccessoryEntity[]> {
    return this.accessoryRepository
      .createQueryBuilder('accessory')
      .leftJoinAndSelect('accessory.category', 'category')
      .where('accessory.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateAccessoryDto,
    image: Express.Multer.File,
  ): Promise<AccessoryEntity> {
    const toUpdate = await this.accessoryRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) toUpdate.name = dto.name;
    if (dto.description) toUpdate.description = dto.description;
    if (dto.price) toUpdate.price = dto.price;
    // if (dto.id) {
    //   const category = await this.categoryRepository.findOne({
    //     where: { id: dto.id },
    //     relations: ['products'],
    //   });
    //   toUpdate.category = category;
    // }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/product/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }

    return this.accessoryRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.accessoryRepository.delete(id);
  }
}
