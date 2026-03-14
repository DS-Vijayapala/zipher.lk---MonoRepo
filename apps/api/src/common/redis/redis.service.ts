import { Injectable, Logger } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService {

    private redis: Redis;

    private readonly logger = new Logger(RedisService.name);

    constructor() {

        try {
            this.redis = new Redis({
                url: process.env.UPSTASH_REDIS_REST_URL!,
                token: process.env.UPSTASH_REDIS_REST_TOKEN!,
            });

        } catch (err) {

            this.logger.error('Failed to initialize Redis client', err);
        }

    }


    // GET

    async get<T = any>(key: string): Promise<T | null> {
        try {
            return await this.redis.get<T>(key);
        } catch (err) {
            this.logger.error(`Redis GET failed for key "${key}"`, err);
            return null; // Safe fallback
        }
    }


    // SET

    async set(key: string, value: any, ttlSeconds = 300): Promise<boolean> {
        try {
            await this.redis.set(key, value, { ex: ttlSeconds });
            return true;
        } catch (err) {
            this.logger.error(
                `Redis SET failed for key "${key}"`,
                err,
            );
            return false;
        }
    }


    // DELETE

    async del(key: string): Promise<boolean> {
        try {
            await this.redis.del(key);
            return true;
        } catch (err) {
            this.logger.error(`Redis DEL failed for key "${key}"`, err);
            return false;
        }
    }

    // WILDCARD DELETE (SCAN)

    async delPattern(pattern: string): Promise<number> {

        try {

            let cursor = 0;
            let deleted = 0;

            do {
                const [nextCursor, keys] = await this.redis.scan(cursor, {
                    match: pattern,
                    count: 100,
                });

                cursor = Number(nextCursor);

                if (keys.length > 0) {
                    const delCount = await this.redis.del(...keys);
                    deleted += delCount;
                }

            } while (cursor !== 0);

            return deleted;

        } catch (err) {

            this.logger.error(`Redis delPattern failed for "${pattern}"`, err);

            return 0;

        }

    }

    async delByPrefix(prefix: string): Promise<number> {
        let cursor = 0;
        let deleted = 0;

        try {
            do {
                const [nextCursor, keys] = await this.redis.scan(cursor, {
                    match: `${prefix}*`,
                    count: 100,
                });

                cursor = Number(nextCursor);

                if (keys.length > 0) {
                    const delCount = await this.redis.del(...keys);
                    deleted += delCount;
                }

            } while (cursor !== 0);

            return deleted;

        } catch (err) {
            this.logger.error(
                `Redis delByPrefix failed for prefix "${prefix}"`,
                err
            );
            return 0;
        }
    }

}
