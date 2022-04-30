import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../addresses/address.entity';
import { ProfileEntity } from './profile.entity';
import { HostEntity } from '../hosts/host.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity, AddressEntity, HostEntity]),
    ],
    providers: [ProfileService],
    controllers: [ProfileController],
})
export class ProfileModule {}
