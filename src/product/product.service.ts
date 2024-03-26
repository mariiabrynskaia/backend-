import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.image = image.filename;
    product.name = dto.name;
    product.speed = dto.speed;
    product.distance = dto.distance;
    product.battery = dto.battery;
    product.weight = dto.weight;
    product.payload = dto.payload;
    product.charging_time = dto.charging_time;
    product.number_of_batteries = dto.number_of_batteries;
    product.motor_power = dto.motor_power;
    product.power_output = dto.power_output;
    product.incline = dto.incline;
    product.amortization = dto.amortization;
    product.safety_light = dto.safety_light;
    product.atmosphere_light = dto.atmosphere_light;
    product.price = dto.price;

    const newProduct = await this.productRepository.save(product);

    const category = await this.categoryRepository.findOne({
      where: { id: dto.id },
      relations: ['products'],
    });

    category.products.push(product);

    await this.categoryRepository.save(category);

    return newProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  async getProductById(id: number) {
    return await this.productRepository.findOneBy({ id: id });
  }

  async findByCategoryId(categoryId: number): Promise<ProductEntity[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const toUpdate = await this.productRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) toUpdate.name = dto.name;
    if (dto.speed) toUpdate.speed = dto.speed;
    if (dto.distance) toUpdate.distance = dto.distance;
    if (dto.battery) toUpdate.battery = dto.battery;
    if (dto.weight) toUpdate.weight = dto.weight;
    if (dto.charging_time) toUpdate.charging_time = dto.charging_time;
    if (dto.payload) toUpdate.payload = dto.payload;
    if (dto.number_of_batteries)
      toUpdate.number_of_batteries = dto.number_of_batteries;
    if (dto.motor_power) toUpdate.motor_power = dto.motor_power;
    if (dto.power_output) toUpdate.power_output = dto.power_output;
    if (dto.incline) toUpdate.incline = dto.incline;
    if (dto.amortization) toUpdate.amortization = dto.amortization;
    if (dto.safety_light) toUpdate.safety_light = dto.safety_light;
    if (dto.atmosphere_light) toUpdate.atmosphere_light = dto.atmosphere_light;
    if (dto.price) toUpdate.price = dto.price;
    if (dto.id) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.id },
        relations: ['products'],
      });
      toUpdate.category = category;
    }
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

    return this.productRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
