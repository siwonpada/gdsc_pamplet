import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/global/entity/map.entity';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Image } from 'src/global/entity/image.entity';
import { Section } from 'src/global/entity/section.entity';
import { CreateMapDto } from './dto/createMap.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import FormData from 'form-data';
import { AiReturn } from './type/AiReturn.type';
import { UpdateSectionsDto } from './dto/updateSection.dto';
import { ConfigService } from '@nestjs/config';
import fs from 'fs/promises';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createMap(
    { name, exhibition_id, image_id }: CreateMapDto,
  ): Promise<Map> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    if (!exhibition) {
      throw new NotFoundException(`Exhibition with id ${exhibition_id} not found`);
    }
    const image = await this.imageRepository.findOne({
      where: { id: image_id },
    });
    if (!image) {
      throw new NotFoundException(`Image with id ${image_id} not found`);
    }

    let map = await this.mapRepository.save({name, exhibition, image})
    const data = await this.getAnalysis(image);
    for (const section of data) {
      const newSection = this.sectionRepository.create({
        block: section.bbox,
        level: section.level,
        map,
        name: 'section',
      });
      await this.sectionRepository.insert(newSection);
    }
    map = await this.mapRepository.findOne({where: {id: map.id}, relations: ['sections']});
    return map;
  }

  async updateSection(id: number, {sections}: UpdateSectionsDto): Promise<Map> {
    const map = await this.mapRepository.findOne({where: {id}, relations: ['sections']});
    if (!map) {
      throw new NotFoundException(`Map with id ${id} not found`);
    }
    await this.sectionRepository.delete({map: {id}});
    for (const section of sections) {
      const newSection = this.sectionRepository.create({
        block: section.block,
        level: section.level,
        map,
        name: section.name,
      });
      await this.sectionRepository.insert(newSection);
    }
    return this.mapRepository.findOne({where: {id}, relations: ['sections']});
  }

  async getAnalysis(image: Image): Promise<AiReturn[]> {
    const formData = new FormData();
    formData.append('file', (await fs.readFile(image.path)) , { filename: image.name });
    const { data } = await firstValueFrom(
      this.httpService.post(this.configService.get<string>('AI_URL'), formData).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data.bbox;
  }
}
