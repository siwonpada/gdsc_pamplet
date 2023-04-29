import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/global/entity/tag.entity';
import { Booth } from 'src/global/entity/booth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Booth])],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
