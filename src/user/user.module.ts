import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSqliteRepository } from './repositories/user.sqlite.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitie/user.entitie';
@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'userSqliteRepository',
      useClass: UserSqliteRepository
    }
  ]
})
export class UserModule { }
