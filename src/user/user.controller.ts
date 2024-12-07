import { Controller, Get, Post, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
@Controller('auth')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.createUser(body.email, body.password);
        return 'User created';
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findUser(+id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.findAllUsers(email);
    }

    @Patch('/:id')
    updateUser(@Body() body: updateUserDto, @Param('id') id: string) {
        console.log(body);
        return this.userService.updateUser(+id, body);
    }

    @Delete('/:id')
    removeUser(@Param("id") id: string) {
        return this.userService.removeUser(+id);
    }

}
