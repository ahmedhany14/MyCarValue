import { Injectable } from "@nestjs/common";
import { User } from "./../entitie/user.entitie";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserSqliteRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(email: string, password: string) {
        const user = this.userRepository.create({ email, password });
        /*
        we use create method to make sure that all data has been validated before saving it to the database
        and hooks has been executed
        */
        return await this.userRepository.save(user);
    }

    public async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('user Not Founded')
        }
        return user;
    }

    public async find(email: string) {
        const users = await this.userRepository.find({
            where: { email }
        });
        return users;
    }

    public async update(id: number, newUser: Partial<User>) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('user Not Founded')
        }
        Object.assign(user, newUser);

        await this.userRepository.save(user);
    }

    public async remove(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('user Not Founded')
        }
        await this.userRepository.remove(user)
    }
}
