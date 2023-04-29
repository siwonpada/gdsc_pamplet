import { Controller, Post } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('exhibition/map')
export class MapController {
    constructor(private readonly mapService: MapService) {}
    
    @Post('')
    async createMap() {
        return this.mapService.createMap();
    }
}
