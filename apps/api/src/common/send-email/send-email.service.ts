// common/send-email/send-email.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { renderFile } from 'ejs';
import { join } from 'path';
import { SendEmailOptions } from './dto/send-mail.dto';
import { SEND_EMAIL_TEMPLATES_DIR } from './constant/send-email.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendEmailService {

    private transporter: nodemailer.Transporter;

    private mailFromDefault: string;

    constructor(
        private readonly configService: ConfigService,
    ) {

        const host = this.configService.get<string>('mail.host');
        const port = this.configService.get<number>('mail.port');
        const secure = this.configService.get<boolean>('mail.secure');
        const user = this.configService.get<string>('mail.user');
        const pass = this.configService.get<string>('mail.pass');
        this.mailFromDefault = this.configService.get<string>('mail.from') as string;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: user && pass ? { user, pass } : undefined,
        });

    }

    private async renderTemplate(templateName: string, vars: Record<string, any>): Promise<string> {

        const templatePath = join(SEND_EMAIL_TEMPLATES_DIR, templateName);

        return new Promise<string>((resolve, reject) => {
            renderFile(templatePath, vars, (err, str) => {
                if (err) return reject(err);
                resolve(str);
            });
        });

    }


    public async sendMail(options: SendEmailOptions) {

        const from = options.from || this.mailFromDefault;

        let html: string | undefined;

        if (options.template) {

            try {

                html = await this.renderTemplate(options.template, options.templateVars || {});

            } catch (err) {

                throw err;

            }

        }

        const mailOptions: nodemailer.SendMailOptions = {
            from,
            to: options.to,
            subject: options.subject,
            html,
            text: html ? undefined : options.templateVars?.text || '',
        };

        const info = await this.transporter.sendMail(mailOptions);

        return info;

    }

    // The function you asked for

    public async sendOtpEmail(
        to: string,
        senderEmail: string,
        senderName: string,
        otp: string,
        template = 'otp-email.ejs',
        expiresInMinutes = 10,
    ) {

        const subject = 'Your Zipher OTP';

        const from = senderEmail || this.mailFromDefault;

        const templateVars = {
            senderName,
            otp,
            expiresInMinutes,
        };

        return this.sendMail({
            to,
            from,
            subject,
            template,
            templateVars,
        });

    }

}
