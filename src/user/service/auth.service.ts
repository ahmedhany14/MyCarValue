import {
    Injectable,
    BadRequestException,
    NotFoundException
} from "@nestjs/common";
import { UserService } from "./user.service";

import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
    ) { }


    async signUp(email: string, password: string) {
        // 1) Check if email is in use

        const users = await this.userService.findAllUsers(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        // 2) Create a new user and hash the password

        const salt = randomBytes(8).toString('hex'); // random string of 8 characters
        const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 is the length of the hash
        const newPass = salt + '.' + hash.toString('hex'); // mex the salt with the hash
        console.log(salt, hash.toString('hex'), newPass);

        const user = await this.userService.createUser(email, newPass);
        // 3) return the user
        return user;
    }


    async signIn(email: string, password: string) {
        const [user] = await this.userService.findAllUsers(email);
        if (!user) throw new NotFoundException('User not found');

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) throw new BadRequestException('Bad password');

        return user;
    }
}