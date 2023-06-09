import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';
import { UpdateSectionsDto } from './dto/updateSection.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('exhibitions/:exhibitionId/maps')
@ApiTags('exhibitions')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMaps(@Param('exhibitionId') id: number) {
    return this.mapService.getMaps(id);
  }

  @Get(':id/sections/:sectionId')
  async getSection(@Param('sectionId') sectionId: number) {
    return this.mapService.getSection(sectionId);
  }

  @Get(':id')
  @ApiParam({ name: 'exhibitionId', type: Number })
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

  @Patch('/:id/sections')
  @ApiParam({ name: 'exhibitionId', type: Number })
  async updateSection(
    @Param('id') id: number,
    @Body() sections: UpdateSectionsDto,
  ) {
    return this.mapService.updateSection(id, sections);
  }
}
