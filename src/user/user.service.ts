import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/global/entity/user.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/global/entity/ticket.entity';
import { Role } from 'src/global/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser({nickname, ticket_uuid, role_id}: CreateUserDto): Promise<User> {
    const ticket = await this.ticketRepository.findOne({where: {uuid: ticket_uuid}});
    const role = await this.roleRepository.findOne({where: {id: role_id}});
    return this.userRepository.save({nickname, ticket, role});
  }
}
