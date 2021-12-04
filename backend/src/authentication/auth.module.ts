import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../models/accounts/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [AccountModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SIGNIN,
    signOptions: { expiresIn: "1200s" }
  })],
  providers: [AuthService, LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {}
