import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { Exhibition } from "./exhibition.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";
import { Image } from "./image.entity";

@Entity()
export class Booth extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'current_attendee_count', default: 0 })
    currentAttendeeCount: number;

    @Column('varchar', { name: 'short_description', default: '' })
    shortDescription: string;

    @Column('text', { name: 'long_description' })
    longDescription: string;

    @Column('int', { name: 'status', default: 0})
    status: number;

    @Column('varchar', { name: 'password', select: false, nullable: true })
    password: string;

    @OneToOne(()=>Image, image=>image.id)
    @JoinColumn({name: 'image_id'})
    image: Image;

    @OneToOne(()=>Section, section=>section.id)
    @JoinColumn({name: 'section_id'})
    section: Section;

    @ManyToOne(()=>Exhibition, exhibition=>exhibition.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'exhibition_id'})
    exhibition: Exhibition;

    @ManyToMany(()=>Tag, tag=>tag.id)
    @JoinTable({name: 'booth_tag', joinColumn: {name: 'booth_id'}, inverseJoinColumn: {name: 'tag_id'}})
    tags: Tag[]

    @ManyToMany(()=>User, user=>user.id)
    @JoinTable({name: 'booth_user', joinColumn: {name: 'booth_id'}, inverseJoinColumn: {name: 'subscriber_id'}})
    subscribers: User[]
}

export enum BoothStatus {
    ACTIVE = 0,
    INACTIVE = 1,
    DELETED = 2
}