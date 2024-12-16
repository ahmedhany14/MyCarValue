import { Injectable, Inject } from '@nestjs/common';
import { ReportSqliteRepository } from './repositories/report.sqlite.repository';
import { CreateReportDto } from './dto/create.report.dto';
import { User } from 'src/user/entitie/user.entitie';
@Injectable()
export class ReportService {
    constructor(
        @Inject('reportSqliteRepository')
        private sqliteRepository: ReportSqliteRepository
    ) { }

    async createReport(report: CreateReportDto, user: User) {
        return await this.sqliteRepository.createReport(report, user);
    }

    async approveReport(id: number, approved: boolean) {
        return await this.sqliteRepository.updateReport(id, approved);
    }
}
