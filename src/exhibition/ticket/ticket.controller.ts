import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { getTicketDto } from './dto/getTicket.dto';

@Controller('exhibition/ticket')
export class TicketController {
    constructor(private readonly ticketService:TicketService) {}

    @Get('')
    async getTicket(@Query() query: getTicketDto) {
        return this.ticketService.getTicket(query);
    }

    @Post('')
    async createTicket(@Body() createTicketDto: CreateTicketDto) {
        return await this.ticketService.createTicket(createTicketDto);
    } 

    @Delete('')
    async deleteTicket(@Query() query: getTicketDto) {
        return await this.ticketService.deleteTicket(query);
    }
}
