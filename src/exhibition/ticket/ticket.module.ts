import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/global/entity/ticket.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Role } from 'src/global/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Exhibition, Role])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
