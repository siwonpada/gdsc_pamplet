import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column('varchar', {name: 'name'})
    name: string
}