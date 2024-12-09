import { Expose, Exclude } from "class-transformer";

export class responseUserDTO {
    @Expose() // This decorator is used to expose the id in the response
    id: number;

    @Expose() // This decorator is used to expose the email in the response
    email: string;

    @Exclude() // This decorator is used to exclude the password from the response
    password: string;
}