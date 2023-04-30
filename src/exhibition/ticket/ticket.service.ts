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

  async getTickets(exhibitionId: number): Promise<Ticket[]> {
    const ticket = this.ticketRepository.find({
      where: { exhibition: { id: exhibitionId } },
      relations: ['role', 'exhibition'],
    });
    if (!ticket) {
      throw new NotFoundException(
        `Ticket with exhibition id ${exhibitionId} not found`,
      );
    }
    return ticket;
  }

  async getTicket({ uuid }: getTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.findOne({
      where: { uuid },
      relations: ['role', 'exhibition'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with uuid ${uuid} not found`);
    }
    return ticket;
  }

  async createTicket(
    exhibitionId: number,
    { name, description, price, role_name }: CreateTicketDto,
  ): Promise<Ticket> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibitionId },
    });
    if (!exhibition) {
      throw new NotFoundException(
        `Exhibition with id ${exhibitionId} not found`,
      );
    }
    let role = await this.roleRepository.findOne({
      where: { name: role_name },
    });
    if (!role) {
      role = await this.roleRepository.save({ name: role_name });
    }
    return this.ticketRepository.save({
      name,
      description,
      price,
      role,
      exhibition,
    });
  }

  async deleteTicket({ uuid }: getTicketDto): Promise<void> {
    const deleteResult = await this.ticketRepository.delete(uuid);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Ticket with uuid ${uuid} not found`);
    }
  }
}
