import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    nickname?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    department?: string;
}