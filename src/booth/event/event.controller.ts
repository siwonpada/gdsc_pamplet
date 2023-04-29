import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from 'src/global/entity/event.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('booths/:boothId/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  async searchEvent(
    @Param('boothId') booth_id: number,
    @Query('name') name?: string,
  ): Promise<Event[]> {
    return this.eventService.searchEvent(booth_id, name);
  }

  @Post()
  async createEvent(
    @Param('boothId') booth_id: number,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.createEvent(booth_id, createEventDto);
  }

  @Patch('/:id/like')
  async updatelike(
    @Param('id') id: number,
    @Query('user_id') user_id: number,
  ): Promise<Event> {
    return this.eventService.updatelike(id, user_id);
  }
}
