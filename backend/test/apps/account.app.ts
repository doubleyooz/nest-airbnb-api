import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AccountEntity } from '../../src/models/accounts/account.entity';
import { HostEntity } from '../../src/models/hosts/host.entity';
import { ProfileEntity } from '../../src/models/profiles/profile.entity';

import TypeOrmConfig from '../../src/config/configurations/typeorm.config';
import { TypeOrmConfigModule } from '../../src/config/database/postgres/configuration.module';
import { TypeOrmConfigService } from '../../src/config/database/postgres/configuration.service';

import { AccountController } from '../../src/models/accounts/account.controller';
import { AccountModule } from '../../src/models/accounts/account.module';
import { AccountService } from '../../src/models/accounts/account.service';

const ENV = process.env.NODE_ENV;
export async function bootstrapTest(): Promise<INestApplication> {
    const moduleFixture = await Test.createTestingModule({
        imports: [
            AccountModule,
            ConfigModule.forRoot({
              envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            }),
            TypeOrmModule.forFeature([
                AccountEntity,
                ProfileEntity,
                HostEntity,
            ]),
            TypeOrmModule.forRootAsync({
                imports: [TypeOrmConfigModule],
                useFactory: async (
                    configService: TypeOrmConfigService,
                ): Promise<TypeOrmModuleOptions> =>
                    TypeOrmConfig.getOrmConfig(configService),
                inject: [TypeOrmConfigService],
            }),
        ],
        controllers: [AccountController],
        providers: [AccountService],
    }).compile();
    console.log('compiled');
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    return app;
}
