import { Report } from '../entitie/report.entitie';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from '../dto/create.report.dto';
import { User } from 'src/user/entitie/user.entitie';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReportSqliteRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async createReport(report: CreateReportDto, user: User) {
    const newReport = this.reportRepository.create(report);
    newReport.user = user;
    return await this.reportRepository.save(newReport);
  }

  async updateReport(id: number, approved: boolean) {
    const report = await this.reportRepository.findOne({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;

    return await this.reportRepository.save(report);
  }
}
