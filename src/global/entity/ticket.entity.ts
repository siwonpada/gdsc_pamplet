import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Exhibition } from "./exhibition.entity";

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column('varchar', { name: 'name' })
    name: string

    @Column('varchar', { name: 'description' })
    description: string

    @Column('int', { name: 'price' })
    price: number

    @ManyToOne(()=>Role, role=>role.id)
    @JoinColumn({name: 'role_id'})
    role: Role

    @ManyToOne(()=>Exhibition, exhibition=>exhibition.id)
    @JoinColumn({name: 'exhibition_id'})
    exhibition: Exhibition
}