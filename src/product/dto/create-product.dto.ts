/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  name: string = 'Наименование товара';

  @IsNumber()
  @Type(() => Number)
  speed: number;

  @IsNumber()
  @Type(() => Number)
  distance: number;

  @IsNumber()
  @Type(() => Number)
  battery: number;

  @IsNumber()
  @Type(() => Number)
  weight: number;

  @IsString()
  payload: string = 'Вместимость по весу';

  @IsNumber()
  @Type(() => Number)
  charging_time: number;

  @IsString()
  number_of_batteries: string = 'Количество батарей в комплекте';

  @IsNumber()
  @Type(() => Number)
  motor_power: number;

  @IsNumber()
  @Type(() => Number)
  power_output: number;

  @IsNumber()
  @Type(() => Number)
  incline: number;

  @IsString()
  amortization: string = 'Амортизация';

  @IsString()
  safety_light: string = 'Сигнальные огни';

  @IsString()
  atmosphere_light: string = 'Декоративные огни';

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  id: number;
}
