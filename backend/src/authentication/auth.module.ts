import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../models/accounts/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [AccountModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
