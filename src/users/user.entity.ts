import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    email: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        typeof(this.password) !== 'undefined' ? crypto.createHmac('sha256', this.password).digest('hex') : this.password;
    }

    @Column({nullable: true})
    password: string;

    /*--------metamask--------*/
    @Column()
    nonce: string;

    @BeforeInsert()
    generateNonce() {
        this.nonce = uuidv4();
    }

    @BeforeInsert()
    toLowerCase() {
        this.publicAddress = this.publicAddress.toLowerCase();
    }

    @Column({
        unique: true
    })
    publicAddress: string;

    @Column({
        unique: true,
        nullable: true
    })
    username: string;

    @Column()
    heroic_user_uuid: string;

    @BeforeInsert()
    generateHeroicId() {
        this.heroic_user_uuid = uuidv4();
    }

    token: string;
}