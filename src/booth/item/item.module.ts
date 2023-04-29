import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/global/entity/item.entity';
import { Booth } from 'src/global/entity/booth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Booth])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
