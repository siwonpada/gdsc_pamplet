import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateBoothDto {
    @IsString()
    name: string

    @IsString()
    short_description: string

    @IsString()
    long_description: string

    @IsNumber()
    @Max(2)
    @Min(0)
    status: number
}