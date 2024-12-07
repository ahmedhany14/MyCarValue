import { Injectable, Inject } from '@nestjs/common';
import { UserSqliteRepository } from './repositories/user.sqlite.repository';
import { User } from './entitie/user.entitie';
@Injectable()
export class UserService {

    constructor(
        @Inject('userSqliteRepository') private readonly userSqliteRepository: UserSqliteRepository
    ) { }

    createUser(email: string, password: string) {
        return this.userSqliteRepository.create(email, password);
    }

    findUser(id: number) {
        return this.userSqliteRepository.findOne(id);
    }

    findAllUsers(email: string) {
        return this.userSqliteRepository.find(email);

    }

    updateUser(id: number, newUser: Partial<User>) {
        return this.userSqliteRepository.update(id, newUser);
    }

    removeUser(id: number) {
        return this.userSqliteRepository.remove(id);
    }
}
