import { Body, Controller, Post, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';

@Controller('exhibition/map')
export class MapController {
    constructor(private readonly mapService: MapService) {}
    
    @Post('')
    async createMap(@Body() createMapDto: CreateMapDto, @Query('exhibition_id') exhibitionId: number) {
        return this.mapService.createMap(createMapDto, exhibitionId);
    }
}
