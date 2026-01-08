import {
    Controller,
    Get,
    Patch,
    Query,
    Body,
    Req,
} from "@nestjs/common"
import { ManageJobsProvider } from "../providers/manage-jobs.provider"
import { ManageJobsQueryDto, ToggleJobVisibilityDto } from "../dto/manage-jobs.dto"
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../lib/constants";


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
}
