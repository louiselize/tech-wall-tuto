import { TimestampEntities } from "src/Generics/timestamp.entities";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('cv') 
export class CvEntity extends TimestampEntities{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        update:false 
    })
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column({
        name:'url', 
        length:'100',
    })
    path: string;

}
