import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    async showAllUsers() {
        console.log("aaaa");
        const users = await this.usersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users
        };
    }

    @Get(':id')
    async readUser(@Param('id') id: number) {
        const data = await this.usersService.read(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User fetched successfully',
            data
        }
    }

    @Get('findByAddress/:publicAddress')
    async readUserByPublicAddress(@Param('publicAddress') publicAddress: string) {
        const user = await this.usersService.findByPublicAddress(publicAddress);        
        return {
            user
        }
    }

    @Post()
    async createUsers(@Body() data: UsersDTO){
        const user = await this.usersService.create(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        }
    }

    @Post('auth')
    async handleAuthenticate(@Body() data: any) {
        const user = await this.usersService.auth(data);
        if(user === false) {
            return {
                statusCode: 401,
                message: 'Signature verification failed',
            }
        }
        return {
            user
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() data: Partial<UsersDTO>){
        const user = await this.usersService.update(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
            user
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        await this.usersService.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted susscessfully'
        }
    }
}
