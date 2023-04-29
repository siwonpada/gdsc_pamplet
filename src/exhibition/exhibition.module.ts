import { Module } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionController } from './exhibition.controller';
import { MapModule } from './map/map.module';

@Module({
  providers: [ExhibitionService],
  controllers: [ExhibitionController],
  imports: [MapModule]
})
export class ExhibitionModule {}
