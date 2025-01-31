import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NidService } from './nid.service';
import { CreateNidDto } from './dto/create-nid.dto';
import { UpdateNidDto } from './dto/update-nid.dto';

@Controller('nid')
export class NidController {
  constructor(private readonly nidService: NidService) { }

  @Post('add')
  create(@Body() createNidDto: CreateNidDto) {
    return this.nidService.create(createNidDto);
  }

  @Get()
  findAll() {
    return this.nidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNidDto: UpdateNidDto) {
    return this.nidService.update(+id, updateNidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nidService.remove(+id);
  }
}
