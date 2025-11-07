import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt-config";
import type { ConfigType } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth-jwtpayload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret as string,
            ignoreExpiration: false,
        });
    }

    async validate(payload: AuthJwtPayload) {

        const userId = payload.sub;

        return this.authService.validateJWTPayload(userId);
    }
}
