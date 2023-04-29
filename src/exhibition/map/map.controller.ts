import { Body, Controller, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/createMap.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateSectionsDto } from './dto/updateSection.dto';

@Controller('exhibition/map')
export class MapController {
    constructor(private readonly mapService: MapService) {}
    
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createMap(@Query() createMapDto: CreateMapDto, @UploadedFile() file: Express.Multer.File) {
        return this.mapService.createMap(createMapDto, file);
    }   

    @Patch('/section')
    async updateSection(@Query('id') id:number, @Body() sections:UpdateSectionsDto ) {
        return this.mapService.updateSection(id, sections);
    }
}
