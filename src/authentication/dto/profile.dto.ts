import { Type } from 'class-transformer';
import {
    IsDate,
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';
import { AddressEntity } from '../../models/addresses/address.entity';
import { HostEntity } from '../../models/hosts/host.entity';

export class CreateProfileDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    governmentID: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    emergencyContact: string;

    @IsString()
    nationality: string;

    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressEntity)
    address: AddressEntity;

    @ValidateNested()
    @Type(() => HostEntity)
    host: HostEntity;
}
