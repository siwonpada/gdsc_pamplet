import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Ticket } from "./ticket.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'nickname' })
    nickname: string

    @ManyToOne(()=>Role, role=>role.id)
    @JoinColumn({name: 'role_id'})
    role: Role

    @ManyToOne(()=>Ticket, ticket=>ticket.uuid)
    @JoinColumn({name: 'ticket_uuid'})
    ticket: Ticket
}