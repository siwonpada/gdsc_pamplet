import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { Tag } from 'src/global/entity/tag.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Booth) private readonly boothRepository: Repository<Booth>,
  ) {}

  async searchTag(tagName: string): Promise<Tag[]> {
    return this.tagRepository.find({ where: { name: Like(`${tagName}%`) } });
  }

  async getTag(tagName: string): Promise<Tag> {
    const tag = this.tagRepository.findOne({ where: { name: tagName } });
    if (tag === null) {
      return this.tagRepository.save({ name: tagName });
    } else {
      return tag;
    }
  }

  async addTag(tagName: string, boothId: number): Promise<Booth> {
    const booth = await this.boothRepository.findOne({ where: { id: boothId } });
    if (!booth) {
      throw new NotFoundException(
        `Booth with id ${boothId} not found`,
      );
    }
    const tag = await this.getTag(tagName);
    booth.tags.push(tag);
    return this.boothRepository.save(booth);
  }

  async deleteTag(tagName: string, boothId: number): Promise<void> {
    const booth = await this.boothRepository.findOne({ where: { id: boothId } });
    if (!booth) {
      throw new NotFoundException(
        `Booth with id ${boothId} not found`,
      );
    }
    const tag = await this.tagRepository.findOne({where : {name : tagName}});
    booth.tags.filter((t)=>t.id!==tag.id);
  }
}
