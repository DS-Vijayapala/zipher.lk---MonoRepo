import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {

    constructor(
        @Inject('CLOUDINARY_PROVIDER') private readonly cloudinaryClient: any,

    ) { }

    async uploadFile(file: Express.Multer.File, folder: string): Promise<UploadApiResponse> {

        return new Promise<UploadApiResponse>((resolve, reject) => {

            const uploadStream = this.cloudinaryClient.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: 'auto',
                },
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            // Convert buffer to stream and pipe to uploadStream
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }

    async deleteFile(publicId: string): Promise<UploadApiResponse> {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            this.cloudinaryClient.uploader.destroy(
                publicId,
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });

    }



}
