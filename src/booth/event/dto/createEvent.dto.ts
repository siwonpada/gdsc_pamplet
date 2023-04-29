import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateEventDto{
    @IsString()
    @ApiProperty()
    name: string

    @IsNumber()
    @IsInt()
    @ApiProperty()
    booth_id: number
}