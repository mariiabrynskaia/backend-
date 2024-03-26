import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({})
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly birthday: Date;

  @ApiProperty()
  readonly isActive: boolean;
}
