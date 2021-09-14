import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersDTO } from './users.dto';

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

    async update(id: number, data: Partial<User>): Promise<User>{
        const user = this.usersRepository.create(data);
        await this.usersRepository.update({ id }, user);
        return await this.read( id );
    }

    async destroy(id: number) {
        await this.read( id );
        await this.usersRepository.delete({ id });
        return { delete: true };
    }
}
