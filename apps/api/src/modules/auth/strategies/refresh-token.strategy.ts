
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt-config";
import type { ConfigType } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth-jwtpayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {

    constructor(
        @Inject(refreshConfig.KEY)
        private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            secretOrKey: refreshTokenConfig.secret as string,
            ignoreExpiration: false,
            passReqToCallback: true
        });
    }

    // Request comes here if token is valid
    async validate(req: Request, payload: AuthJwtPayload) {

        const userId = payload.sub;

        const refreshToken = req.body.refresh;

        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}
