import {
    Controller,
    Get,
    Patch,
    Query,
    Body,
    Req,
    Param,
} from "@nestjs/common"
import { ManageJobsProvider } from "../providers/manage-jobs.provider"
import { ManageJobsQueryDto, ToggleJobVisibilityDto } from "../dto/manage-jobs.dto"
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../lib/constants";
import { UpdateJobDto } from "../dto/update-job.dto";


@Controller("jobs/manage")
export class ManageJobsController {
    constructor(
        private readonly manageJobsProvider: ManageJobsProvider
    ) { }

    @Get()
    async getMyJobs(
        @Req() req,
        @Query() query: ManageJobsQueryDto
    ) {
        const userId = req.user.id;
        return this.manageJobsProvider.getUserJobs(
            userId,
            query.page || DEFAULT_PAGE_NUMBER,
            query.limit || DEFAULT_PAGE_LIMIT
        )
    }

    @Patch("toggle-visibility")
    async toggleVisibility(
        @Body() dto: ToggleJobVisibilityDto,
        @Req() req
    ) {
        const userId = req.user.id;
        return this.manageJobsProvider.toggleVisibility(userId, dto.jobId)
    }

    // update job details
    @Patch(":jobId")
    async updateJob(
        @Param("jobId") jobId: string,
        @Body() dto: UpdateJobDto,
        @Req() req
    ) {
        const userId = req.user.id;
        return this.manageJobsProvider.updateJob(userId, jobId, dto);
    }
}
