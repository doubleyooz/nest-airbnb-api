import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsDefined, IsInt } from 'class-validator';
import { ValidatedConfigService } from '../utils/validate.config';

@Injectable()
export class AppConfigService extends ValidatedConfigService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    @IsDefined()
    @IsInt()      
    get port(): number {    
        return  parseInt(this.configService.get<string>('app.port'), 10)
                
    }
}
