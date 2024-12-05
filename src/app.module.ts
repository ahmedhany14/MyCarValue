import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entitie/user.entitie';
import { Report } from './report/entitie/report.entitie';

import { join } from 'path';
@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'db.sqlite'), // Use absolute path
      entities: [User, Report],
      synchronize: true,
    }),
    ReportModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
