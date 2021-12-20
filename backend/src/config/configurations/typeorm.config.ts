import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'config/database/postgres/configuration.service';

export default class TypeOrmConfig {
    static getOrmConfig(
        configService: TypeOrmConfigService,
    ): TypeOrmModuleOptions {
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

            migrations: [__dirname + 'src/database/migrations/**/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/database/migrations',
            },

            connectTimeoutMS: 2000,
        };
    }
}
