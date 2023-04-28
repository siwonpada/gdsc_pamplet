import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { Repository } from 'typeorm';
import { CreateBoothDto } from './dto/createBooth.dto';

@Injectable()
export class BoothService {
  constructor(
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
  ) {}

  async getAllBooths(): Promise<Booth[]> {
    return this.boothRepository.find();
  }

  async getBoothById(boothId: number): Promise<Booth> {
    return this.boothRepository.findOne({where: {id: boothId}});
  }

  async createBooth(boothDto: CreateBoothDto): Promise<Booth> {
    return this.boothRepository.save({ ...boothDto });
  }

  async deleteBooth(boothId: number): Promise<void> {
    const deleteResult = await this.boothRepository.delete(boothId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Booth with id ${boothId} not found`);
    }
  }
}
