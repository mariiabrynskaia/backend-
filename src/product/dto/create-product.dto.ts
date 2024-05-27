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
  name: string = 'Наименование';

  @IsNumber()
  @Type(() => Number)
  speed: number = 20;

  @IsNumber()
  @Type(() => Number)
  distance: number = 22;

  @IsString()
  battery: string = '5100 mAh';

  @IsNumber()
  @Type(() => Number)
  weight: number = 13.5;

  @IsString()
  payload: string = '25 кг - 100 кг';

  @IsNumber()
  @Type(() => Number)
  charging_time: number = 3.5;

  @IsString()
  number_of_batteries: string = '1 встроенная';

  @IsString()
  motor_power: string = 'Номинальная 300W';

  @IsString()
  power_output: string = '71W (0.071kW)';

  @IsNumber()
  @Type(() => Number)
  incline: number = 15;

  @IsString()
  amortization: string = 'Передняя';

  @IsString()
  safety_light: string = 'Задний LED-фонарь';

  @IsString()
  atmosphere_light: string = '---';

  @IsNumber()
  @Type(() => Number)
  price: number = 34900;

  @IsNumber()
  @Type(() => Number)
  id: number;
}
