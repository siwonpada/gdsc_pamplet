import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from 'src/global/entity/event.entity';

@Controller('booth/event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get('/search')
    async searchEvent(@Query('booth_id') booth_id: number, @Query('name') name: string): Promise<Event[]> {
        return this.eventService.searchEvent(booth_id, name);
    }

    @Post('/')
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventService.createEvent(createEventDto);
    }

    @Patch('/like')
    async updatelike(@Query('id') id: number, @Query('user_id') user_id: number): Promise<Event> {
        return this.eventService.updatelike(id, user_id);
    }
}
