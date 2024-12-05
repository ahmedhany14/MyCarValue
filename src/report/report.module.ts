import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entitie/report.entitie';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report])
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule { }
