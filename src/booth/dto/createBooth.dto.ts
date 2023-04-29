import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateBoothDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    short_description: string

    @ApiProperty()
    @IsString()
    long_description: string

    @ApiProperty()
    @IsNumber()
    @Max(2)
    @Min(0)
    status: number
}