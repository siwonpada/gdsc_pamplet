import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/global/entity/map.entity';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Image } from 'src/global/entity/image.entity';
import { Section } from 'src/global/entity/section.entity';
import { CreateMapDto } from './dto/createMap.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(Section) private readonly sectionRepository: Repository<Section>,
    private readonly httpService: HttpService,
  ) {}

  async createMap({name}: CreateMapDto, exhibition_id, file: Express.Multer.File): Promise<Map> {
    const exhibition = await this.exhibitionRepository.findOne({where: {id: exhibition_id}});
    
    return;
  }

  async getAnalysis(file: Express.Multer.File): Promise<any> {
    const data = this.httpService.get('http://localhost:8000/uploadfile')
  }
}
