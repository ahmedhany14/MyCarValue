import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    BeforeInsert,
    BeforeRemove,
    BeforeUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "./../../report/entitie/report.entitie";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    @Exclude() // This decorator is used to exclude the password from the response
    password: string

    @OneToMany(() => Report, report => report.user)
    reports: Report[]


    @AfterInsert() // This decorator is used to execute a function after the insertion of a new user
    logAfterInsert() { // it is like mongodb's middleware, we can use it to log or modify the data after the insertion
        console.log(`user with id ${this.id} inserted`)
    }
    /*
       same functionality for the other decorators but each one is used for a different event like, update, remove, etc.
    */

    @AfterUpdate()
    logAfterUpdate() {
        console.log(`user with id ${this.id} updated`)
    }

    @AfterRemove()
    logAfterRemove() {
        console.log(`user with id ${this.id} removed`)
    }

}