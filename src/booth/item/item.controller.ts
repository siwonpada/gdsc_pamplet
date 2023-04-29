import { Controller, Get, Patch, Post, Query, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/createItem.dto';

@Controller('booth/item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('/search')
    async searchItem() {
        return this.itemService.searchItem();
    }

    @Post('/')
    async createItem(@Query('booth_id') boothId: number, @Body() createItemDto: CreateItemDto) {
        return this.itemService.createItem(boothId, createItemDto);
    }

    @Patch('category')
    async updateCategory(@Query('event_id') eventId: number, @Body() createItemDto: CreateItemDto) {
        return this.itemService.updateCategory(eventId, createItemDto);
    }
}
