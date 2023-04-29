import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Image } from '../global/entity/image.entity';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) { }

    async uploadImg(file: Express.Multer.File): Promise<Image> {
        const image = this.imageRepository.create();
        image.name = file.originalname;
        image.path = file.path;
        return this.imageRepository.save(image);
    }

    async downloadImg(id: number, res: Response) {
        const image = await this.imageRepository.findOne({where: {id}});
        if (!image) {
            throw new NotFoundException(`Image with id ${id} not found`);
        }
        res.download(image.path, image.name);
    }
}
