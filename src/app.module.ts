import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [],
      synchronize: true,
    }),
    ReportModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
