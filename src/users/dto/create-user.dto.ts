import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/role/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ default: '1234' })
  password: string;

  @ApiHideProperty()
  @IsNotEmpty()
  role: Role = Role.User;
}
