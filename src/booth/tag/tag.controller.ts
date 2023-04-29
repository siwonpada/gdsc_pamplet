import { Controller, Get, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/global/entity/tag.entity';

@Controller('booth/tag')
export class TagController {
    constructor(private readonly tagservice: TagService) {}

    @Get('/')
    async getTag(@Query('name') tagName: string): Promise<Tag> {
        return this.tagservice.getTag(tagName);
    }

    @Get('/search')
    async searchTag(@Query('name') tagName: string): Promise<Tag[]> {
        return this.tagservice.searchTag(tagName);
    }

    @Delete('/')
    async deleteTag(@Query('name') tagName: string): Promise<void> {
        return;
    }
}
