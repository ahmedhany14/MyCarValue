import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UserService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const id = request.session.userId;

        if (id) {
            const user = await this.userService.findUser(id);
            request.user = user;
        }
        return next.handle();
    }
}