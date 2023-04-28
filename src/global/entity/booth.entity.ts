import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booth extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'current_attendee_count', default: 0 })
    currentAttendeeCount: number;

    @Column('varchar', { name: 'short_description' })
    shortDescription: string;

    @Column('text', { name: 'long_description' })
    longDescription: string;

    @Column('varchar', { name: 'image' })
    image: string;

    @Column('int', { name: 'status', default: 0})
    status: number;
}

export enum BoothStatus {
    ACTIVE = 0,
    INACTIVE = 1,
    DELETED = 2
}