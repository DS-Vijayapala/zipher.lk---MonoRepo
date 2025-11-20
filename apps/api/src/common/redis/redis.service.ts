import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });
    }

    async get(key: string) {
        return await this.redis.get(key);
    }

    async set(key: string, value: any, ttlSeconds = 300) {
        return await this.redis.set(key, value, { ex: ttlSeconds });
    }

    async del(key: string) {
        return await this.redis.del(key);
    }
}

