import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './../service/user.service';
import { User } from '../entitie/user.entitie';

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
