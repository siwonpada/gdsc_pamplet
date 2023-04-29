import { Controller, Get, Delete, Query, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/global/entity/tag.entity';
import { Booth } from 'src/global/entity/booth.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('booths/tag')
@ApiTags('booth')
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

  @Post('/')
  async addTag(
    @Query('name') tagName: string,
    @Query('booth_id') boothId: number,
  ): Promise<Booth> {
    return this.tagservice.addTag(tagName, boothId);
  }

  @Delete('/')
  async deleteTag(
    @Query('name') tagName: string,
    @Query('booth_id') boothId: number,
  ): Promise<void> {
    return this.tagservice.deleteTag(tagName, boothId);
  }
}
