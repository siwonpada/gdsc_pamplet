import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booth } from "./booth.entity";
import { User } from "./user.entity";

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { name: 'name' })
    name: string

    @Column('int', { name: 'like', default: 0 })
    like: number

    @ManyToOne(()=>Booth, booth=>booth.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'booth_id'})
    booth: Booth

    @ManyToMany(()=>User, user=>user.id)
    @JoinTable({name: 'event_user', joinColumn: {name: 'event_id'}, inverseJoinColumn: {name: 'liked_user_id'}})
    likedUsers: User[]
}