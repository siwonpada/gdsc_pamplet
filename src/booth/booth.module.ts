import { Module } from '@nestjs/common';
import { BoothController } from './booth.controller';
import { BoothService } from './booth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { EventModule } from './event/event.module';
import { ItemModule } from './item/item.module';
import { TagModule } from './tag/tag.module';
import { User } from 'src/global/entity/user.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Section } from 'src/global/entity/section.entity';
import { Image } from 'src/global/entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booth, User, Exhibition, Section, Image]), EventModule, ItemModule, TagModule],
  controllers: [BoothController],
  providers: [BoothService],
})
export class BoothModule {}
