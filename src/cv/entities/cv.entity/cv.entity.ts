import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv') //DB table name is CV
export class CvEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        update:false //once data is created, can't be modified
    })
    name: string;

    @Column()
    firstname: number;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column({
        name:'url', // 'path' is called 'url' in DB
        length:'100',
        //enum..
    })
    path: string;
}
