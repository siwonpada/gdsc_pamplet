import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Map } from "./map.entity";

@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'path'})
    path: string;

    @ManyToOne(()=>Map, map=>map.id, {onDelete: 'CASCADE'})
    map: Map;
}