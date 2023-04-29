import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth, BoothStatus } from 'src/global/entity/booth.entity';
import { Repository } from 'typeorm';
import { CreateBoothDto } from './dto/createBooth.dto';
import { User } from 'src/global/entity/user.entity';

@Injectable()
export class BoothService {
  constructor(
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllBooths(): Promise<Booth[]> {
    return this.boothRepository.find();
  }

  async getBoothById(boothId: number): Promise<Booth> {
    const booth = this.boothRepository.findOne({where: {id: boothId}});
    if (!booth) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
    return booth;
  }

  async createBooth(boothDto: CreateBoothDto): Promise<Booth> {
    return this.boothRepository.save({ ...boothDto });
  }

  async updateAttendeeCount(boothId: number, attendeeCount: number): Promise<Booth> {
    const booth = await this.getBoothById(boothId)
    booth.currentAttendeeCount = attendeeCount;
    return this.boothRepository.save(booth);
  }

  async updateBoothStatus(boothId: number, status: BoothStatus): Promise<Booth> {
    const booth = await this.getBoothById(boothId)
    booth.status = status;
    return this.boothRepository.save(booth);
  }

  async updateLongDescription(boothId: number, longDescription: string): Promise<Booth> {
    const booth = await this.getBoothById(boothId)
    booth.longDescription = longDescription;
    return this.boothRepository.save(booth);
  }

  async updataSubscribe(boothId: number, subscribe: boolean, subcriberId: number): Promise<Booth> {
    const booth = await this.getBoothById(boothId)
    const user = await this.userRepository.findOne({where: {id: subcriberId}});
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
