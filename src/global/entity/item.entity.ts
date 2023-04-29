import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booth } from "./booth.entity";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @Column('varchar', { name: 'description' })
    description: string

    @Column('int', { name: 'price' })
    price: number

    @Column('varchar', { name: 'image' })
    image: string

    @ManyToOne(()=>Booth, booth=>booth.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'booth_id'})
    booth: Booth
}