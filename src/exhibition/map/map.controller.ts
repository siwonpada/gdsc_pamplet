import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';
import { UpdateSectionsDto } from './dto/updateSection.dto';

@Controller('exhibitions/:exhibitionId/maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMaps(@Param('exhibitionId') id: number) {
    return this.mapService.getMaps(id);
  }

  @Get(':id')
  async getMap(@Param('id') id: number) {
    return this.mapService.getMap(id);
  }

  @Post('')
  async createMap(
    @Param('exhibitionId') exhibitionId: number,
    @Body() createMapDto: CreateMapDto,
  ) {
    return this.mapService.createMap(exhibitionId, createMapDto);
  }

  @Patch('/section')
  async updateSection(
    @Query('id') id: number,
    @Body() sections: UpdateSectionsDto,
  ) {
    return this.mapService.updateSection(id, sections);
  }
}
