import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersDTO } from './users.dto';
import * as ethUtil from 'ethereumjs-util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async showAll() {
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO): Promise<User> {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }

    async findByPublicAddress(publicAddress: string): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail({
                where: {
                    publicAddress: publicAddress
                }
            })
        } catch (err) {
            throw new HttpException('public address does not exist!', 404);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail({
                where: {
                    email: email
                }
            })
        } catch (err) {
            throw new HttpException('User does not exist!', 404);
        }
    }

    async read(id: number): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new HttpException('User does not exist!', 404);
        }
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(data);
        await this.usersRepository.update({ id }, user);
        return await this.read(id);
    }

    async destroy(id: number) {
        await this.read(id);
        await this.usersRepository.delete({ id });
        return { delete: true };
    }

    async auth(data: any) {
        const user = await this.findByPublicAddress(data.publicAddress);

        const msg = `I am signing my one-time nonce: ${user.nonce}`;               
        const msgBuffer = Buffer.from(msg, 'utf8'); 

        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        const signatureParams = ethUtil.fromRpcSig(data.signature);
        const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);

        //update nonce
        user.nonce = Math.floor(Math.random() * 1000000);
        this.usersRepository.save(user);

        if (address.toLowerCase() === user.publicAddress.toLowerCase()) {                        
            return { name: user.name, username: user.username };
        } else {
            return false;
        }
    }
}
