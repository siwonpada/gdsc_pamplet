import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booth extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'current_attendee_count' })
    currentAttendeeCount: number;

    @Column('varchar', { name: 'short_description' })
    shortDescription: string;

    @Column('text', { name: 'long_description' })
    longDescription: string;

    @Column('varchar', { name: 'image' })
    image: string;

    @Column('varchar', { name: 'status'})
    status: string;
}