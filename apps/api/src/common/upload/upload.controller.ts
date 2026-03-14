import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('resume')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
  ) {
    // if (!file) {
    //   throw new BadRequestException('File is required');
    // }

    // if (file.mimetype !== 'application/pdf') {
    //   throw new BadRequestException('Only PDF files are allowed');
    // }

    // const result = await this.uploadService.uploadFile(
    //   file,
    //   'zipher/resumes',
    // );

    // return {
    //   url: result.secure_url,
    //   publicId: result.public_id,
    // };
  }
}
