import { Module } from '@nestjs/common';
import { BoothController } from './booth.controller';
import { BoothService } from './booth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booth])],
  controllers: [BoothController],
  providers: [BoothService],
})
export class BoothModule {}
