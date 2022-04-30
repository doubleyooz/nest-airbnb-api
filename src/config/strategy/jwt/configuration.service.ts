import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsDefined, IsString } from 'class-validator';
import { ValidatedConfigService } from '../../utils/validate.config';

@Injectable()
export class JwtConfigService extends ValidatedConfigService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    @IsString()
    @IsDefined()
    get signIn(): string {      
        return this.configService.get<string>('jwt.sign_in');
    }

    @IsString()
    @IsDefined()
    get expiration(): string {      
        return this.configService.get<string>('jwt.expiration');
    }

}
