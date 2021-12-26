import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './authentication/auth.module';
import { AccountModule } from './models/accounts/account.module';
import { AppConfigModule } from './config/app/configuration.module';
import { ProfileModule } from './models/profiles/profile.module';
import { TypeOrmConfigModule } from './config/database/postgres/configuration.module';

import { AppController } from './app.controller';

import { TypeOrmConfigService } from './config/database/postgres/configuration.service';
import { AppService } from './app.service';

import TypeOrmConfig from './config/configurations/typeorm.config';

const ENV = process.env.NODE_ENV;
console.log(ENV);
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        AppConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [TypeOrmConfigModule],
            useFactory: async (
                configService: TypeOrmConfigService,
            ): Promise<TypeOrmModuleOptions> =>
                TypeOrmConfig.getOrmConfig(configService),
            inject: [TypeOrmConfigService],
        }),
        AuthModule,
        AccountModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
