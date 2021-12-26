import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsString } from 'class-validator';
import { Logger } from 'typeorm';
import { ValidatedConfigService } from '../../utils/validate.config';

type logger = 'advanced-console' | 'simple-console' | 'file' | 'debug' | Logger;

@Injectable()
export class TypeOrmConfigService extends ValidatedConfigService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    @IsString()
    @IsDefined()
    get type(): string {
        return this.configService.get<string>('db.type');
    }

    @IsString()
    @IsDefined()
    get host(): string {
        return this.configService.get<string>('db.host');
    }

    @IsInt()
    @IsDefined()
    get port(): number {       
        return parseInt(this.configService.get('db.port'), 10);
    }

    @IsString()
    @IsDefined()
    get username(): string {        
        return this.configService.get<string>('db.username');
    }

    @IsString()
    @IsDefined()
    get password(): string {
        return this.configService.get<string>('db.password');
    }

    @IsString()
    @IsDefined()
    get name(): string {
        console.log(this.configService.get<string>('db.name'));
        return this.configService.get<string>('db.name');
    }
}
