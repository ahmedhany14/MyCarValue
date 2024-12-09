import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from 'class-transformer';

interface Class {
    new(...args: any[]): {}
}

export function Serialize(dto: Class) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: Class) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //console.log('I am running before the handler', context);

        return next.handle().pipe(
            map((data: Class) => {
                //console.log('DTO:', new this.dto(data));
                return plainToClass(this.dto, data, { excludeExtraneousValues: true });
            })
        );
    }
}