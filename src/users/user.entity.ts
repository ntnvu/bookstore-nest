import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as crypto from 'crypto';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    @Column()
    password: string;

    /*--------metamask--------*/
    @Column()
    nonce: number

    @BeforeInsert()
    generateNonce() {
        this.nonce = Math.floor(Math.random() * 1000000);
    }

    @BeforeInsert()
    toLowerCase() {
        this.publicAddress = this.publicAddress.toLocaleLowerCase();
    }

    @Column({
        unique: true
    })
    publicAddress: string;

    @Column({
        unique: true
    })
    username: string;
}