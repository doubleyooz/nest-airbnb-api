import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'config/app/configuration.module';
import { typeOrmConfigAsync } from 'config/configurations/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AccountModule } from './models/accounts/account.module';
import { ProfileModule } from './models/profiles/profile.module';

const ENV = process.env.NODE_ENV;
console.log(ENV)
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,         
        }),
        AppConfigModule,
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        AuthModule,
        AccountModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
