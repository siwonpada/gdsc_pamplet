import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';
import { UpdateSectionsDto } from './dto/updateSection.dto';

@Controller('exhibition/map')
export class MapController {
    constructor(private readonly mapService: MapService) {}

    @Get('')
    async getMap(@Query('id') id:number) {

    }
    
    @Post('')
    async createMap(@Query() createMapDto: CreateMapDto) {
        return this.mapService.createMap(createMapDto);
    }   

    @Patch('/section')
    async updateSection(@Query('id') id:number, @Body() sections:UpdateSectionsDto ) {
        return this.mapService.updateSection(id, sections);
    }
}
