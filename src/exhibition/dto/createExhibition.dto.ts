import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExhibitionDto {
  @ApiProperty()
  @IsString()
  name: string;
}
