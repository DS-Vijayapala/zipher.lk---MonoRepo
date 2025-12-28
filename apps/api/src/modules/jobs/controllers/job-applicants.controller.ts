import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    Query,
    Req,
} from '@nestjs/common';
import { JobApplicantsProvider } from '../providers/job-applicants.provider';
import { GetJobApplicantsDto } from '../dto/get-job-applicants.dto';
import { UpdateApplicationStatusDto } from '../dto/update-application-status.dto';

@Controller('job-applicants')
export class JobApplicantsController {
    constructor(
        private readonly provider: JobApplicantsProvider,
    ) { }

    @Get()
    async getApplicants(
        @Req() req: any,
        @Query() query: GetJobApplicantsDto,
    ) {
        const userId = req.user.id;

        return this.provider.getApplicants(
            userId,
            query.status,
            query.page,
            query.limit,
        );
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body() body: UpdateApplicationStatusDto,
    ) {
        return this.provider.updateStatus(id, body.status);
    }
}
