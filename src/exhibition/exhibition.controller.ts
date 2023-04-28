import { Controller, Post } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { Exhibition } from 'src/global/entity/exhibition.entity';

@Controller('exhibition')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Post('/')
    async createExhibition(): Promise<Exhibition> {
        return;
    }
}
