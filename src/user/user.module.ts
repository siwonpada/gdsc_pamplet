import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/global/entity/user.entity';
import { Role } from 'src/global/entity/role.entity';
import { Ticket } from 'src/global/entity/ticket.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Ticket, Role])]
})
export class UserModule {}
