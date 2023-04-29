import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Map } from "./map.entity";

@Entity()
export class Section extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @Column({type: 'int', array: true, name: 'block'})
    block: number[]

    @Column('int', {name: 'level'})
    level: number

    @ManyToOne(()=>Map, map=>map.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'map_id'})
    map: Map
}
