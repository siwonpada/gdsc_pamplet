import { Module } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionController } from './exhibition.controller';
import { MapModule } from './map/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from 'src/global/entity/exhibition.entity';

@Module({
  providers: [ExhibitionService],
  controllers: [ExhibitionController],
  imports: [MapModule, TypeOrmModule.forFeature([Exhibition])]
})
export class ExhibitionModule {}
