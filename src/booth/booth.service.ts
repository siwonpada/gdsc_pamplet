import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth, BoothStatus } from 'src/global/entity/booth.entity';
import { Repository } from 'typeorm';
import { CreateBoothDto } from './dto/createBooth.dto';
import { User } from 'src/global/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Section } from 'src/global/entity/section.entity';
import { Image } from 'src/global/entity/image.entity';

@Injectable()
export class BoothService {
  constructor(
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getAllBooths(): Promise<Booth[]> {
    return this.boothRepository.find();
  }

  async getBoothById(boothId: number): Promise<Booth> {
    const booth = this.boothRepository.findOne({ where: { id: boothId }, relations: ['section'] });
    if (!booth) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
    return booth;
  }

  async createBooth({
    exhibition_id,
    ...boothDto
  }: CreateBoothDto): Promise<Booth> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    if (!exhibition) {
      throw new NotFoundException(
        `Exhibition with id ${exhibition_id} not found`,
      );
    }
    const { password, ...rest } = boothDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.boothRepository.save({
      name: rest.name,
      shortDescription: rest.short_description,
      longDescription: rest.long_description,
      status: rest.status,
      password: hashedPassword,
      exhibition: exhibition,
    });
  }

  async createManagerBooth({exhibition_id, ...BoothDto}: CreateBoothDto):Promise<Booth> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    if (!exhibition) {
      throw new NotFoundException(
        `Exhibition with id ${exhibition_id} not found`,
      );
    }
    const { password, ...rest } = BoothDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const booth = await this.boothRepository.save({
      name: rest.name,
      shortDescription: rest.short_description,
      longDescription: rest.long_description,
      status: rest.status,
      password: hashedPassword,
      exhibition: exhibition,
    })
    exhibition.managerBooth = booth;
    await this.exhibitionRepository.save(exhibition);
    return booth;
  }

  async updateBoothName(boothId: number, name: string): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    booth.name = name;
    return this.boothRepository.save(booth);
  }

  async updateAttendeeCount(
    boothId: number,
    attendeeCount: number,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    booth.currentAttendeeCount = attendeeCount;
    return this.boothRepository.save(booth);
  }

  async updateBoothStatus(
    boothId: number,
    status: BoothStatus,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    booth.status = status;
    return this.boothRepository.save(booth);
  }

  async updateLongDescription(
    boothId: number,
    longDescription: string,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    booth.longDescription = longDescription;
    return this.boothRepository.save(booth);
  }

  async updateShortDescription(
    boothId: number,
    shortDescription: string,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    booth.shortDescription = shortDescription;
    return this.boothRepository.save(booth);
  }

  async updateFile(boothId: number, image_id: number): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    const image = await this.imageRepository.findOne({ where: { id: image_id } });
    booth.image = image;
    return this.boothRepository.save(booth);
  }

  async updataSubscribe(
    boothId: number,
    subscribe: boolean,
    subcriberId: number,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    const user = await this.userRepository.findOne({
      where: { id: subcriberId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${subcriberId} not found`);
    }

    if (subscribe) {
      booth.subscribers.push(user);
    } else {
      booth.subscribers = booth.subscribers.filter(
        (subscriber) => subscriber.id !== subcriberId,
      );
    }
    return this.boothRepository.save(booth);
  }

  async updateBoothSection(
    booth_id: number,
    section_id: number,
  ): Promise<Booth> {
    const booth = await this.boothRepository.findOne({
      where: { id: booth_id },
      relations: ['section'],
    });
    if (!booth) {
      throw new NotFoundException(`Booth with id ${booth_id} not found`);
    }
    const section = await this.sectionRepository.findOne({
      where: { id: section_id },
    });
    if (!section) {
      throw new NotFoundException(`Section with id ${section_id} not found`);
    }
    booth.section = section;
    return this.boothRepository.save(booth);
  }

  async deleteBooth(boothId: number): Promise<void> {
    const deleteResult = await this.boothRepository.delete(boothId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
  }
}
