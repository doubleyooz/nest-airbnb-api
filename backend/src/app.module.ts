import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from 'config/app/configuration.module';
import TypeOrmConfig from 'config/configurations/typeorm.config';
import { TypeOrmConfigModule } from 'config/database/postgres/configuration.module';
import { TypeOrmConfigService } from 'config/database/postgres/configuration.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AccountModule } from './models/accounts/account.module';
import { ProfileModule } from './models/profiles/profile.module';

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
