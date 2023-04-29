import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { getTicketDto } from './dto/getTicket.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('exhibitions/:exhibitionId/tickets')
@ApiTags('exhibitions')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTickets(@Param('exhibitionId') exhibitionId: number) {
    return this.ticketService.getTickets(exhibitionId);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: String })
  @ApiParam({ name: 'exhibitionId', type: Number })
  async getTicket(@Param() params: getTicketDto) {
    return this.ticketService.getTicket(params);
  }

  @Post('')
  async createTicket(
    @Param('exhibitionId') exhibitionId: number,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketService.createTicket(exhibitionId, createTicketDto);
  }

  @Delete(':uuid')
  @ApiParam({ name: 'uuid', type: String })
  @ApiParam({ name: 'exhibitionId', type: Number })
  async deleteTicket(@Param() params: getTicketDto) {
    return await this.ticketService.deleteTicket(params);
  }
}
