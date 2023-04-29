import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth, BoothStatus } from 'src/global/entity/booth.entity';
import { Repository } from 'typeorm';
import { CreateBoothDto } from './dto/createBooth.dto';
import { User } from 'src/global/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Exhibition } from 'src/global/entity/exhibition.entity';

@Injectable()
export class BoothService {
  constructor(
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
  ) {}

  async getAllBooths(): Promise<Booth[]> {
    return this.boothRepository.find();
  }

  async getBoothById(boothId: number): Promise<Booth> {
    const booth = this.boothRepository.findOne({ where: { id: boothId } });
    if (!booth) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
    return booth;
  }

  async createBooth(boothDto: CreateBoothDto, exhibition_id:number): Promise<Booth> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { id: exhibition_id } });
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

  async updataSubscribe(
    boothId: number,
    subscribe: boolean,
    subcriberId: number,
  ): Promise<Booth> {
    const booth = await this.getBoothById(boothId);
    const user = await this.userRepository.findOne({
      where: { id: subcriberId },
    });
    booth.subscribers.push(user);
    return this.boothRepository.save(booth);
  }

  async deleteBooth(boothId: number): Promise<void> {
    const deleteResult = await this.boothRepository.delete(boothId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
  }
}
