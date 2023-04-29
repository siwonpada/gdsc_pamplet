import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateMapDto {
    @IsNumber()
    @IsInt()
    image_id: number;

    @IsString()
    name: string;
}