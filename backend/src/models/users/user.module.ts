import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/models/addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
