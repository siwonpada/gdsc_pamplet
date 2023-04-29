import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsNumber()
    @IsInt()
    price: number;
}