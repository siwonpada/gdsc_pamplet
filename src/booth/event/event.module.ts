import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/global/entity/event.entity';
import { Booth } from 'src/global/entity/booth.entity';
import { User } from 'src/global/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Booth, User])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
