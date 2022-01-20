import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../models/accounts/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AccountService } from '../models/accounts/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../models/accounts/account.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleConfigModule } from '../config/strategy/google/configuration.module';
import { JwtConfigModule } from '../config/strategy/jwt/configuration.module';
import { JwtConfigService } from '../config/strategy/jwt/configuration.service';

@Module({
    imports: [
        AccountModule,
        GoogleConfigModule,
        JwtConfigModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],            
            useFactory: async (configService : JwtConfigService) => ({
              secret: configService.signIn,
              signOptions: {
                expiresIn: configService.expiration,
              },
            }),
            inject: [JwtConfigService],
          }),       
        PassportModule,       
        TypeOrmModule.forFeature([AccountEntity]),
    ],
    controllers: [AuthController],
    providers: [AccountService, AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
