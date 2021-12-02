import { IsDate, IsEmail, IsNotEmpty, ValidateNested } from "class-validator";
import { AddressEntity } from "src/models/addresses/entities/address.entity";
import { HostEntity } from "src/models/hosts/entities/host.entity";

export class CreateUserDto{  
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    gender: string;
    
    @IsEmail()
    email: string;

    governmentID : string;

    @IsNotEmpty()
    phoneNumber: string;


    emergencyContact : string;

    
    nationality : string;

    @IsDate()
    birthDate: Date;  
  
    @IsDate()
    createdAt: Date;  
            
    @ValidateNested()
    address: AddressEntity;
    
    @ValidateNested()
    host: HostEntity; 
}