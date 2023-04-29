import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/global/entity/map.entity';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Image } from 'src/global/entity/image.entity';
import { Section } from 'src/global/entity/section.entity';
import { CreateMapDto } from './dto/createMap.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(Section) private readonly sectionRepository: Repository<Section>,
  ) {}

  async createMap({name, image_id}: CreateMapDto, exhibition_id): Promise<Map> {
    const exhibition = await this.exhibitionRepository.findOne({where: {id: exhibition_id}});
    const image = await this.imageRepository.findOne({where: {id: image_id}});
    const map = this.mapRepository.create({name, exhibition, image});

    return;
  }
}
