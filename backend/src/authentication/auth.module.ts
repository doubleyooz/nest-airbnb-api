import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../models/accounts/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AccountService } from '../models/accounts/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../models/accounts/account.entity';

@Module({
    imports: [
        AccountModule,
        JwtModule.register({
            secret: process.env.JWT_SIGNIN,
            signOptions: { expiresIn: '1200s' },
        }),
        PassportModule,
        TypeOrmModule.forFeature([AccountEntity]),
    ],
    controllers: [AuthController],
    providers: [AccountService, AuthService, JwtStrategy],
})
export class AuthModule {}
