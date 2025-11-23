import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryUsage } from 'process';

@Module({
  imports: [MulterModule.register({
    storage: memoryUsage(),
  })],
  controllers: [UploadController],
  providers: [
    UploadService,
    CloudinaryProvider,
  ],
  exports: [UploadService],
})
export class UploadModule { }
