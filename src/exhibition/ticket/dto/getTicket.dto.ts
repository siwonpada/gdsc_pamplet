import { IsUUID } from 'class-validator';

export class getTicketDto {
  @IsUUID()
  uuid: string;
}
