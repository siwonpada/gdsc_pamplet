import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booth } from "./booth.entity";
import { Image } from "./image.entity";

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

    @OneToOne(()=>Image, image=>image.id)
    @JoinColumn({name: 'image_id'})
    image: Image

    @ManyToOne(()=>Booth, booth=>booth.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'booth_id'})
    booth: Booth
}