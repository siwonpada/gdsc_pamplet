import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ticket_uuid: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    role_id: number;
}