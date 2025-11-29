// common/send-email/dto/send-email.dto.ts

export class SendEmailOptions {

    to: string;
    subject: string;
    template?: string; // path/name of template, e.g., 'otp-email.ejs'
    templateVars?: Record<string, any>;
    from?: string;     // allow overriding default sender

}
