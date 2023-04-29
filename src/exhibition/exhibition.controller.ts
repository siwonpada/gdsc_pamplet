import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { CreateExhibitionDto } from './dto/createExhibition.dto';

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
    async createExhibition(@Body() createExhibitionDto: CreateExhibitionDto): Promise<Exhibition> {
        return this.exhibitionService.createExhibition(createExhibitionDto);
    }
}
