import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exhibition } from "./exhibition.entity";

@Entity()
export class Map extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @ManyToOne(()=>Exhibition, exhibition=>exhibition.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'exhibition_id'})
    exhibition: Exhibition
}