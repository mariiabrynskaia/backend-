import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateAccessoryDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

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
  name = 'Наименование товара';

  @IsString()
  description = 'Описание товара';

  @IsNumber()
  @Type(() => Number)
  price: number;
}
