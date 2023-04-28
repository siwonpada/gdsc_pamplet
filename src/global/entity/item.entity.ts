import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}