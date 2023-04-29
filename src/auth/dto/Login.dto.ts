import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    password: string
}