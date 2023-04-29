import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { Event } from 'src/global/entity/event.entity';
import { Like, Repository } from 'typeorm';
import { CreateEventDto } from './dto/createEvent.dto';
import { User } from 'src/global/entity/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async searchEvent(booth_id: number, name: string): Promise<Event[]> {
    return this.eventRepository.find({
        where: {
            booth: {id : booth_id},
            name: Like(`${name}%`)
        }
    });
  }

  async createEvent({name, booth_id}: CreateEventDto): Promise<Event> {
    const booth = await this.boothRepository.findOne({where: {id: booth_id}});
    if (!booth) {
      throw new NotFoundException(
        `Booth with id ${booth_id} not found`,
      );
    }
    return this.eventRepository.save({name, booth})
  }

  async updatelike(id, user_id): Promise<Event> {
    const event = await this.eventRepository.findOne({where: {id}});
    const user = await this.userRepository.findOne({where: {id: user_id}});
    if (!event) {
      throw new NotFoundException(
        `Event with id ${id} not found`,
      );
    }
    if (!user) {
      throw new NotFoundException(
        `User with id ${user_id} not found`,
      );
    }
    event.likedUsers.push(user);
    event.like += 1;

    return this.eventRepository.save(event);
  }
}
