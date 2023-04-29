import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/global/entity/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/createTicket.dto';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Role } from 'src/global/entity/role.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getTicket(uuid: string): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { uuid }, relations: ['role', 'exhibition'] });
  }

  async createTicket({
    name,
    description,
    price,
    role_name,
    exhibition_id,
  }: CreateTicketDto): Promise<Ticket> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibition_id },
    });
    let role = await this.roleRepository.findOne({
      where: { name: role_name },
    });
    if (!role) {
      role = await this.roleRepository.save({ name: role_name });
    }
    return this.ticketRepository.create({ name, description, price, role, exhibition });
  }

  async deleteTicket(uuid: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { uuid } });
    return this.ticketRepository.remove(ticket);
  }
}
