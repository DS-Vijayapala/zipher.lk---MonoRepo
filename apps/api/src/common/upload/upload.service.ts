import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
    constructor(
        @Inject('CLOUDINARY_PROVIDER')
        private readonly cloudinaryClient: any,
    ) { }

    uploadFile(
        file: Express.Multer.File,
        folder: string,
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinaryClient.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'auto',
                },
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }

    deleteFile(publicId: string): Promise<UploadApiResponse> {
        return this.cloudinaryClient.uploader.destroy(publicId);
    }
}
