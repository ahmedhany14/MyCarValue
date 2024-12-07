import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    BeforeInsert,
    BeforeRemove,
    BeforeUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string


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