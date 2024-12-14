import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entitie/report.entitie';

import { ReportSqliteRepository } from './repositories/report.sqlite.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report])
  ],
  controllers: [ReportController],
  providers: [
    ReportService,
    {
      provide: 'reportSqliteRepository',
      useClass: ReportSqliteRepository
    }
  ]
})
export class ReportModule { }
