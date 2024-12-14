import { Report } from '../entitie/report.entitie';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from '../dto/create.report.dto';

@Injectable()
export class ReportSqliteRepository {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>
    ) { }

    async createReport(report: CreateReportDto) {
        const newReport = this.reportRepository.create(report);
        return await this.reportRepository.save(newReport);
    }
}