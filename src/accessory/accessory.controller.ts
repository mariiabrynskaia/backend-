import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';
import { fileStorage } from './storage';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { AccessoryEntity } from './entities/accessory.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/role/role.enum';

@ApiTags('accessory')
@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateAccessoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<AccessoryEntity> {
    return this.accessoryService.create(dto, image);
  }

  @Get('categoryId')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'categoryId', required: false })
  findAll(@Query('categoryId') categoryId: number): Promise<AccessoryEntity[]> {
    if (categoryId) return this.accessoryService.findByCategoryId(categoryId);
    else return this.accessoryService.findAll();
  }

  @Get('/image/:path')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/accessory' });
  }

  @Get('/:id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<AccessoryEntity> {
    return this.accessoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAccessoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<AccessoryEntity> {
    return this.accessoryService.update(+id, dto, image);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.accessoryService.delete(+id);
  }
}
