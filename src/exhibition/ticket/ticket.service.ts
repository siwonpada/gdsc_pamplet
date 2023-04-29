import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/global/entity/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/createTicket.dto';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Role } from 'src/global/entity/role.entity';
import { getTicketDto } from './dto/getTicket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getTicket({uuid}: getTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.findOne({ where: { uuid }, relations: ['role', 'exhibition'] });
    if (!ticket) {
      throw new NotFoundException(`Ticket with uuid ${uuid} not found`);
    }
    return ticket;
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
    if (!exhibition) {
      throw new NotFoundException(
        `Exhibition with id ${exhibition_id} not found`,
      );
    }
    let role = await this.roleRepository.findOne({
      where: { name: role_name },
    });
    if (!role) {
      role = await this.roleRepository.save({ name: role_name });
    }
    return this.ticketRepository.save({ name, description, price, role, exhibition });
  }

  async deleteTicket({uuid}: getTicketDto): Promise<void> {
    const deleteResult = await this.ticketRepository.delete(uuid);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Ticket with uuid ${uuid} not found`);
    }
  }
}
