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
    { name, exhibition_id }: CreateMapDto,
    file: Express.Multer.File,
  ): Promise<Map> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    const data = await this.getAnalysis(file);

    return data;
  }

  async getAnalysis(file: Express.Multer.File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file.buffer.toString('base64'));
    const {data} = await firstValueFrom(
      this.httpService.post('http://127.0.0.1:8000/uploadfile', formData).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data
  }
}
