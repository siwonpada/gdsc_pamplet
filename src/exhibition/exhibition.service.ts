import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Repository } from 'typeorm';
import { CreateExhibitionDto } from './dto/createExhibition.dto';

@Injectable()
export class ExhibitionService {
    constructor(@InjectRepository(Exhibition) private readonly exhibitionRepository: Repository<Exhibition>) {}

    async getAllExhibitions(): Promise<Exhibition[]> {
        return this.exhibitionRepository.find();
    }

    async getExhibitionById(id: number): Promise<Exhibition> {
        return this.exhibitionRepository.findOne({where: {id}, relations: ['booths']});
    }

    async createExhibition({name}: CreateExhibitionDto): Promise<Exhibition> {
        const exhibition = this.exhibitionRepository.create({name});
        return this.exhibitionRepository.save(exhibition);
    }
}
