import { Controller, Post, Body } from '@nestjs/common';
import { CreateReportDto } from './dto/create.report.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ReportService } from './report.service';
@Controller('report')
export class ReportController {

    constructor(
        private reportService: ReportService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    async createReport(@Body() report: CreateReportDto) {
        const newReport = await this.reportService.createReport(report);
        return {
            message: 'Report created successfully',
            report: newReport
        };
    }
}
