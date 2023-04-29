import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booth } from "./booth.entity";

@Entity()
export class Exhibition extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @OneToOne(()=>Booth, booth=>booth.id)
    @JoinColumn({name: 'manager_booth_id'})
    managerBooth: Booth
}