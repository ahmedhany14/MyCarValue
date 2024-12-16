import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { UserSqliteRepository } from './repositories/user.sqlite.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitie/user.entitie';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    {
      provide: 'userSqliteRepository',
      useClass: UserSqliteRepository
    }
  ]
})
export class UserModule { 

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }

}
