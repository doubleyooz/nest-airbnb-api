import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';
import { ValidatedConfigService } from '../utils/validate.config';

@Injectable()
export class AppConfigService extends ValidatedConfigService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    @IsInt()
    @IsDefined()
    @Type(() => Number)
    get port(): number {
        return this.configService.get('app.port');
    }
}
