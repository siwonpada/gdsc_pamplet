import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/global/entity/tag.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
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
}
