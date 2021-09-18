import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersDTO } from './users.dto';
import { v4 as uuidv4 } from 'uuid';

import * as ethUtil from 'ethereumjs-util';
import { HeroiclabsService } from 'src/heroiclabs/heroiclabs.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private heroiclabsService: HeroiclabsService
    ) { }

    async showAll() {
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO): Promise<Object> {
        let user: User;
        await this.usersRepository.save(this.usersRepository.create(data))
            .then(userReturn => user = userReturn)
            .then(user => this.heroiclabsService.connectHeroic({ create: true, heroic_user_uuid: user.heroic_user_uuid }))

        return {
            nonce: user.nonce,
            publicAddress: user.publicAddress
        };
    }

    async findByPublicAddress(publicAddress: string): Promise<any> {
        const data = await this.usersRepository.findOne({
            where: {
                publicAddress: publicAddress
            }
        })
        return typeof (data) !== 'undefined' ? data : {};
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
        const id: number = user.id;
        await this.usersRepository.update({ id }, { nonce: uuidv4() });
        
        if (address.toLowerCase() === user.publicAddress.toLowerCase()) {
            await this.heroiclabsService.connectHeroic({ create: false, heroic_user_uuid: user.heroic_user_uuid })
                .then(token => user.token = token);
            return { token: user.token };
        } else {
            return false;
        }
    }
}
