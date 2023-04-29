import { Body, Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('exhibition/map')
export class MapController {
    constructor(private readonly mapService: MapService) {}
    
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createMap(@Query() createMapDto: CreateMapDto, @UploadedFile() file: Express.Multer.File) {
        return this.mapService.createMap(createMapDto, file);
    }   
}
