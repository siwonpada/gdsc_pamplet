import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from 'src/global/entity/map.entity';
import { Section } from 'src/global/entity/section.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Image } from 'src/global/entity/image.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Map, Section, Exhibition, Image]), HttpModule],
  controllers: [MapController],
  providers: [MapService]
})
export class MapModule {}
