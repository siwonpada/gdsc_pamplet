import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { BoothService } from './booth.service';
import { Booth } from 'src/global/entity/booth.entity';
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

    @Delete('')
    async deleteBooth(@Query('id') id: number): Promise<void> {
        return this.boothService.deleteBooth(id);
    }
}
