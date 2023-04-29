import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { BoothService } from './booth.service';
import { Booth, BoothStatus } from 'src/global/entity/booth.entity';
import { CreateBoothDto } from './dto/createBooth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('booths')
@ApiTags('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @Get('/')
  async getAllBooths(): Promise<Booth[]> {
    return this.boothService.getAllBooths();
  }

  @Get(':id')
  async getBoothById(@Param('id') id: number): Promise<Booth> {
    return this.boothService.getBoothById(id);
  }

  @Post('')
  async createBooth(@Body() boothDto: CreateBoothDto): Promise<Booth> {
    return this.boothService.createBooth(boothDto);
  }

  @Patch('/:id/attendee')
  async updateAttendeeCount(
    @Param('id') id: number,
    @Body('attendee_count') attendeeCount: number,
  ): Promise<Booth> {
    return this.boothService.updateAttendeeCount(id, attendeeCount);
  }

  @Patch('/:id/status')
  @ApiBody({
    schema: { type: 'object', properties: { status: { type: 'number' } } },
  })
  async updateBoothStatus(
    @Param('id') id: number,
    @Body('status') status: BoothStatus,
  ): Promise<Booth> {
    return this.boothService.updateBoothStatus(id, status);
  }

  @Patch('/:id/long_description')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { long_description: { type: 'string' } },
    },
  })
  async updateLongDescription(
    @Param('id') id: number,
    @Body('long_description') longDescription: string,
  ): Promise<Booth> {
    return this.boothService.updateLongDescription(id, longDescription);
  }

  @Patch('/:id/subscribe')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        subscribe: { type: 'boolean' },
        subscriber_id: { type: 'number' },
      },
    },
  })
  async updateSubscribe(
    @Param('id') id: number,
    @Body('subscribe') subscribe: boolean,
    @Body('subcriber_id') subscriberId: number,
  ): Promise<Booth> {
    return this.boothService.updataSubscribe(id, subscribe, subscriberId);
  }

  @Delete(':id')
  async deleteBooth(@Param('id') id: number): Promise<void> {
    return this.boothService.deleteBooth(id);
  }
}
