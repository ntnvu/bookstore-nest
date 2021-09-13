import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CatEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    breed: string;

    @Column()
    age: string;    
}