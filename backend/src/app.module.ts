import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AccountModule } from './models/accounts/account.module';
import { ProfileModule } from './models/profiles/profile.module';
import { typeOrmConfigAsync } from './config/configurations/typeorm.config';
import { TypeOrmConfigService } from './config/database/postgres/configuration.service';
import { TypeOrmConfigurationProvider } from './providers/TypeOrmConfigProvider';



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `../../.env.${process.env.NODE_ENV}`            
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () =>
                Object.assign(new TypeOrmConfigurationProvider(new TypeOrmConfigService(new ConfigService())), {
                    autoLoadEntities: true,
                }),
        }),
        AuthModule,
        AccountModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
