import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { HostEntity } from '../hosts/entities/host.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, ProfileEntity, HostEntity])],
  providers: [AccountService],
  controllers:[AccountController]
})
export class AccountModule {}
