import { Controller, Post, Get, Query } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { Exhibition } from 'src/global/entity/exhibition.entity';

@Controller('exhibition')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Get('')
    async getAllExhibitions(): Promise<Exhibition[]> {
        return;
    }

    @Get('/find')
    async getExhibitionById(@Query('id') id:number): Promise<Exhibition> {
        return;
    }

    @Post('/')
    async createExhibition(): Promise<Exhibition> {
        return;
    }
}
