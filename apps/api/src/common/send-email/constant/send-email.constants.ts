import { join } from 'path';

export const SEND_EMAIL_TEMPLATES_DIR = join(
    process.cwd(),
    'src',
    'common',
    'send-email',
    'templates'
);
