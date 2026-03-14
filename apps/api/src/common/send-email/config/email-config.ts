// common/send-email/configs/mail.config.ts

import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM_DEFAULT!,
}));
