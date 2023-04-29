import { Body, Controller, Delete, Get, Post, Patch, Query } from '@nestjs/common';
import { BoothService } from './booth.service';
import { Booth, BoothStatus } from 'src/global/entity/booth.entity';
import { CreateBoothDto } from './dto/createBooth.dto';

@Controller('booth')
export class BoothController {
    constructor(private readonly boothService: BoothService) {}

    @Get('/all')
    async getAllBooths(): Promise<Booth[]> {
        return this.boothService.getAllBooths();
    }

    @Get('')
    async getBoothById(@Query('id') id: number): Promise<Booth> {
        return this.boothService.getBoothById(id);
    }

    @Post('')
    async createBooth(@Body() boothDto: CreateBoothDto): Promise<Booth> {
        return this.boothService.createBooth(boothDto);
    }

    @Patch('/attendee')
    async updateAttendeeCount(@Query('id') id: number, @Body() attendeeCount: number): Promise<Booth> {
        return this.boothService.updateAttendeeCount(id, attendeeCount);
    }

    @Patch('/status')
    async updateBoothStatus(@Query('id') id: number, @Body() status: BoothStatus): Promise<Booth> {
        return this.boothService.updateBoothStatus(id, status);
    }

    @Patch('/long_description')
    async updateLongDescription(@Query('id') id: number, @Body() longDescription: string): Promise<Booth> {
        return this.boothService.updateLongDescription(id, longDescription);
    }

    @Patch('/subscribe')
    async updateSubscribe(@Query('id') id: number, @Body('subscribe') subscribe: boolean, @Body('subcriber_id') subscriberId: number ): Promise<Booth> {
        return this.boothService.updataSubscribe(id, subscribe, subscriberId);
    }

    @Delete('')
    async deleteBooth(@Query('id') id: number): Promise<void> {
        return this.boothService.deleteBooth(id);
    }
}
