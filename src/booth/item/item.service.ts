import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/createItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/global/entity/item.entity';
import { Like, Repository } from 'typeorm';
import { Booth } from 'src/global/entity/booth.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Booth) private readonly boothRepository: Repository<Booth>,
  ) {}

  async searchItem(name: string) {
    return this.itemRepository.find({ where: { name: Like(`${name}%`) } });
  }

  async createItem(boothId: number, createItemDto: CreateItemDto): Promise<Item> {
    const booth = await this.boothRepository.findOne({ where: { id: boothId } });
    if (!booth) {
      throw new NotFoundException(
        `Booth with id ${boothId} not found`,
      );
    }
    const item = this.itemRepository.create({...createItemDto});
    item.booth = booth;
    return this.itemRepository.save(item);
  }

  async updateCategory(eventId: number, {description}: CreateItemDto) {
    const event = await this.itemRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException(
        `Event with id ${eventId} not found`,
      );
    }
    event. description = description;
    return this.itemRepository.save(event);
  }
}
