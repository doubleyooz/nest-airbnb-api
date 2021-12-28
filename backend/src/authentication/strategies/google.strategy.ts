import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { GoogleConfigService } from '../../config/strategy/google/configuration.service';
import { Account } from '../../models/accounts/interfaces/account.interface';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: GoogleConfigService) {        
        super({
            clientID: configService.googleId,
            clientSecret: configService.googleSecret,
            callbackURL: configService.host + 'google/redirect',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const account: Account = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            password: '',
            birthDate: undefined
        }
        done(null, account);
    }
}