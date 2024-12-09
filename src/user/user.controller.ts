import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    Query,
    ClassSerializerInterceptor,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { responseUserDTO } from './dto/response.user.dto';

import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Serialize } from '../interceptors/serialize.interceptor';
@Controller('auth')
@Serialize(responseUserDTO) // apply the custom decorator to the whole controller
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.createUser(body.email, body.password);
        return 'User created';
    }

    //@UseInterceptors(ClassSerializerInterceptor) // this is a nest recommended way to serialize the response
    // custom interceptor
    //@UseInterceptors(new SerializeInterceptor(responseUserDTO))
    // instead writing the above line we can use a custom decorator
    //@Serialize(responseUserDTO)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findUser(+id);
    }

    //@UseInterceptors(ClassSerializerInterceptor) // this is a nest recommended way to serialize the response
    // custom interceptor
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
