import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exhibition } from "./exhibition.entity";
import { Image } from "./image.entity";
import { Section } from "./section.entity";

@Entity()
export class Map extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @ManyToOne(()=>Exhibition, exhibition=>exhibition.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'exhibition_id'})
    exhibition: Exhibition

    @OneToOne(()=>Image, image=>image.id, {onDelete: 'CASCADE'})
    image: Image

    @OneToMany(()=>Section, section=>section.map, {onDelete: 'CASCADE'})
    sections: Section[]
}