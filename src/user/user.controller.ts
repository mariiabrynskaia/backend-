import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Get('getAll')
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Get('getUserById/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  async getUserById(@Param('id', new ParseIntPipe()) id) {
    return await this.userService.getUser(id);
  }

  @Put('updateUser/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, dto);
  }

  @Delete('deleteUser/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @HttpCode(200)
  async deleteUser(@Param('id', new ParseIntPipe()) id) {
    return await this.userService.deleteUser(id);
  }
}
