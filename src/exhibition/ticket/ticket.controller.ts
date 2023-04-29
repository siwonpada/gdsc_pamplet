import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicket.dto';

@Controller('exhibition/ticket')
export class TicketController {
    constructor(private readonly ticketService:TicketService) {}

    @Get('')
    async getTicket(@Query('uuid')uuid: string) {
        return await this.ticketService.getTicket(uuid);
    }

    @Post('')
    async createTicket(@Body() createTicketDto: CreateTicketDto) {
        return await this.ticketService.createTicket(createTicketDto);
    } 

    @Delete('')
    async deleteTicket(@Query('uuid')uuid: string) {
        return await this.ticketService.deleteTicket(uuid);
    }
}
