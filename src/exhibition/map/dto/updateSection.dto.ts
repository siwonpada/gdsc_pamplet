import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class UpdataSectionDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber({}, {each: true})
    @ApiProperty()
    block: number[];
    
    @IsNumber()
    @ApiProperty()
    level: number;
}

export class UpdateSectionsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>UpdataSectionDto)
    @ApiProperty({type: [UpdataSectionDto]})
    sections: UpdataSectionDto[];
}