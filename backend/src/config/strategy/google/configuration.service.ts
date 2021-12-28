import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsDefined, IsString } from 'class-validator';
import { ValidatedConfigService } from '../../utils/validate.config';

@Injectable()
export class GoogleConfigService extends ValidatedConfigService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    @IsString()
    @IsDefined()
    get host(): string {
        return this.configService.get<string>('google.host');
    }

    @IsString()
    @IsDefined()
    get googleId(): string {
        return this.configService.get<string>('google.id');
    }

    @IsString()
    @IsDefined()
    get googleSecret(): string {
        return this.configService.get<string>('google.secret');
    }
}
