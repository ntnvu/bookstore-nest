import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UsersDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    async showAllUsers() {
        const users = await this.usersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users
        };
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

    @Get(':id')
    async readUser(@Param('id') id: number) {
        const data = await this.usersService.read(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User fetched successfully',
            data
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
