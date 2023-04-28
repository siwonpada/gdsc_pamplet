import { Controller, Query, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/global/entity/tag.entity';

@Controller('tag')
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
}
