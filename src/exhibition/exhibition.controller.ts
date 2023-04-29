import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { CreateExhibitionDto } from './dto/createExhibition.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('exhibitions')
@ApiTags('exhibitions')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @Get('')
  async getAllExhibitions(): Promise<Exhibition[]> {
    return this.exhibitionService.getAllExhibitions();
  }

  @Get('/:id')
  async getExhibitionById(@Param('id') id: number): Promise<Exhibition> {
    return this.exhibitionService.getExhibitionById(id);
  }

  @Post('/')
  async createExhibition(
    @Body() createExhibitionDto: CreateExhibitionDto,
  ): Promise<Exhibition> {
    return this.exhibitionService.createExhibition(createExhibitionDto);
  }
}
