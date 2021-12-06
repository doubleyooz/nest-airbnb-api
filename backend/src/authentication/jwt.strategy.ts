import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PayloadDto } from './dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SIGNIN,
        });
    }

    async validate(payload: PayloadDto): Promise<PayloadDto> {
        if (this.authService.validateTokenVersion(payload))
            return {
                id: payload.id,
                tokenVersion: payload.tokenVersion,
            };
        throw new UnauthorizedException('Invalid token version.');
    }
}
