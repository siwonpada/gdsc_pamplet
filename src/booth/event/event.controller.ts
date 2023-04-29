import { Controller, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('booth/event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get('/search')
    async searchEvent() {
        return this.eventService.searchEvent();
    }

    @Post('/')
    async createEvent() {
        return this.eventService.createEvent();
    }

    @Patch('/like')
    async updatelike(){
        return this.eventService.updatelike();
    }
}
