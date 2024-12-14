import { Injectable, Inject } from '@nestjs/common';
import { ReportSqliteRepository } from './repositories/report.sqlite.repository';
@Injectable()
export class ReportService {
    constructor(
        @Inject('reportSqliteRepository')
        private sqliteRepository: ReportSqliteRepository
    ) { }

    async createReport(report: any) {
        return await this.sqliteRepository.createReport(report);
    }
}
