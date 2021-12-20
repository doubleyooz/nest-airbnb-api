import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../database/postgres/configuration.service';

export default class TypeOrmConfig {
    static getOrmConfig(configService: TypeOrmConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.host,
            port: configService.port,
            username: configService.username,
            password: configService.password,
            database: configService.name,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
            //migrationsDir: 'src/database/migrations',
            migrationsRun: true,
            synchronize: true,
            logger: 'file',
            logging: true,
            connectTimeoutMS: 2000,
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {   
    imports: [ConfigModule],
    
    useFactory: async (
        configService: TypeOrmConfigService,
    ): Promise<TypeOrmModuleOptions> =>
        TypeOrmConfig.getOrmConfig(configService),
  
};
