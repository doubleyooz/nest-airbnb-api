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
import { AddressEntity } from 'src/models/addresses/entities/address.entity';
import { HostEntity } from 'src/models/hosts/entities/host.entity';

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
