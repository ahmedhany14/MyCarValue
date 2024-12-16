import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './../service/user.service';
import { User } from '../entitie/user.entitie';

/*interface requestWithUser extends Request {
    user?: User;
}*/

/*
declare global: will allow us to extend the Request interface from Express and add additional properties to it
namespace Express: will allow us to access the Request interface from Express
 */
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.usersService.findUser(userId);
            req.user = user;
        }

        next();
    }
}
