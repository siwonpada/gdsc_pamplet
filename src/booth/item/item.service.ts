import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/createItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/global/entity/item.entity';
import { Repository } from 'typeorm';
import { Booth } from 'src/global/entity/booth.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Booth) private readonly boothRepository: Repository<Booth>,
  ) {}

  async searchItem() {
    return 'search item';
  }

  async createItem(boothId: number, createItemDto: CreateItemDto): Promise<Item> {
    const booth = await this.boothRepository.findOne({ where: { id: boothId } });
    const item = this.itemRepository.create({...createItemDto});
    item.booth = booth;
    return this.itemRepository.save(item);
  }

  async updateCategory(eventId: number, {description}: CreateItemDto) {
    const event = await this.itemRepository.findOne({ where: { id: eventId } });
    event. description = description;
    return this.itemRepository.save(event);
  }
}
