import { IsString } from "class-validator";

export class UpdateDescriptionDto {
    @IsString()
    description: string;
}