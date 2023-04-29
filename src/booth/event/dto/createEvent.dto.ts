import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;
}
