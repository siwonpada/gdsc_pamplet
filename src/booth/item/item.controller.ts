import {
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/createItem.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('booths/:boothId/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  async searchItem(@Query('name') name?: string) {
    return this.itemService.searchItem(name);
  }

  @Post('/')
  async createItem(
    @Param('boothId') boothId: number,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.createItem(boothId, createItemDto);
  }

  @Patch('category')
  async updateCategory(
    @Query('event_id') eventId: number,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.updateCategory(eventId, createItemDto);
  }
}
