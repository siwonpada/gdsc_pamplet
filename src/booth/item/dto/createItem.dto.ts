import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsInt()
    @ApiProperty()
    price: number;
}