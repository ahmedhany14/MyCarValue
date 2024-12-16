import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create.report.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ReportService } from './report.service';
import { CurrentUser } from 'src/user/decorators/curren-user.decorator';
import { User } from 'src/user/entitie/user.entitie';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve.report.dto';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(
    @Body() report: CreateReportDto,
    @CurrentUser() user: User,
  ) {
    const newReport = await this.reportService.createReport(report, user);
    return newReport;
  }

  @Patch('/:id')
  async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    const report = await this.reportService.approveReport(
      parseInt(id),
      body.approved,
    );

    return report;
  }
}
