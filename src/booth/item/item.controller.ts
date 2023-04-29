import { Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('booth/item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('/search')
    async searchItem() {
        return this.itemService.searchItem();
    }

    @Post('/')
    async createItem() {
        return this.itemService.createItem();
    }
}
