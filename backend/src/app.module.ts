import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AccountModule } from './models/accounts/account.module';
import { ProfileModule } from './models/profiles/profile.module';
import { DatabaseConfig } from './database/database.config'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(
            DatabaseConfig
        ),
        AuthModule,
        AccountModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
