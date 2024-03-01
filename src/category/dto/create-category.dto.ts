import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
