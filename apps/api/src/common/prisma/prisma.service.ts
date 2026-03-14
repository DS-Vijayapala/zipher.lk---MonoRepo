import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log:
                process.env.NODE_ENV === 'production'
                    ? ['error']
                    : ['warn', 'error'],
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Prisma connected');
        } catch (error) {
            console.error('❌ Prisma connection failed', error);
            process.exit(1);
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
            console.log('🔌 Prisma disconnected');
        } catch (error) {
            console.error('❌ Prisma disconnect failed', error)
        }
    }
}
