import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfigService } from 'config/strategy/jwt/configuration.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PayloadDto } from '../dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService, private readonly configService: JwtConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.signIn,
            
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
