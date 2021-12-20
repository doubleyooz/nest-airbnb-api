import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { TypeOrmModule } from 'config/database/postgres/configuration.module';
import { TypeOrmConfigService } from 'config/database/postgres/configuration.service';

export default class TypeOrmConfig {
    static getOrmConfig(
        configService: TypeOrmConfigService,
    ): TypeOrmModuleOptions {
        console.log(configService.port) //????????????
        return {
            type: 'postgres',
            host: configService.host,
            port: configService.port,
            username: configService.username,
            password: configService.password,
            database: configService.name,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            migrationsRun: true,
            logging: true,
            logger: 'file',

           
            migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/database/migrations',
            },

            

            connectTimeoutMS: 2000,
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [TypeOrmModule],
    useFactory: async (
        configService: TypeOrmConfigService,
    ): Promise<TypeOrmModuleOptions> =>
        TypeOrmConfig.getOrmConfig(configService),
    inject: [TypeOrmConfigService],
};
