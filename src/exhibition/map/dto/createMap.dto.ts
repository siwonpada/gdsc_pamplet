import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateMapDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsInt()
    @ApiProperty()
    exhibition_id: number;

    @IsNumber()
    @IsInt()
    @ApiProperty()
    image_id: number;
}