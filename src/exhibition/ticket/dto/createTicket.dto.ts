import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsInt()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  role_name: string;
}
