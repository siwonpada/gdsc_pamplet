import { Injectable } from '@nestjs/common';
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
  ) {}

  async createMap(
    { name, exhibition_id, image_id }: CreateMapDto,
    file: Express.Multer.File,
  ): Promise<Map> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    const image = await this.imageRepository.findOne({
      where: { id: image_id },
    });
    const map = this.mapRepository.create({ exhibition, image, name });
    const data = await this.getAnalysis(file);
    for (const section of data) {
      const newSection = this.sectionRepository.create({
        block: section.bbox,
        level: section.level,
        map,
        name: 'section',
      });
      await this.sectionRepository.save(newSection);
    }

    return this.mapRepository.save(map);
  }

  async getAnalysis(file: Express.Multer.File): Promise<AiReturn[]> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const { data } = await firstValueFrom(
      this.httpService.post('http://127.0.0.1:8000/uploadfile', formData).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data.bbox;
  }
}
