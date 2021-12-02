import { IsDate, IsDefined, IsEmail, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { AddressEntity } from "src/models/addresses/entities/address.entity";
import { HostEntity } from "src/models/hosts/entities/host.entity";

export class CreateProfileDto{  
   
    @IsDefined()
    @IsString()    
    @IsNotEmpty()
    gender: string;

 
    @IsString()      
    governmentID : string;

    @IsDefined()
    @IsString()       
    @IsNotEmpty()
    phoneNumber: string;
  
    @IsString()        
    emergencyContact : string;

    @IsString()
    nationality : string;

    @IsDefined() 
    @IsNotEmpty()    
    @ValidateNested()
    address: AddressEntity;
    
    @ValidateNested()
    host: HostEntity; 
}