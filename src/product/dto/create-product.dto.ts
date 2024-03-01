/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
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
  speed: number;

  @IsNumber()
  distance: number;

  @IsNumber()
  battery: number;

  @IsNumber()
  weight: number;

  @IsString()
  payload: string = 'Вместимость по весу';

  @IsNumber()
  charging_time: number;

  @IsString()
  number_of_batteries: string = 'Количество батарей в комплекте';

  @IsNumber()
  motor_power: number;

  @IsNumber()
  power_output: number;

  @IsNumber()
  incline: number;

  @IsString()
  amortization: string = 'Амортизация';

  @IsString()
  safety_light: string = 'Сигнальные огни';

  @IsString()
  atmosphere_light: string = 'Декоративные огни';

  @IsNumber()
  price: number;

  @IsNumber()
  id: number;
}
