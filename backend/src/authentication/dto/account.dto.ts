import { IsDate, IsDefined, IsEmail, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { IsValidPassword } from "src/common/validators/is.valid.password";
import { AddressEntity } from "src/models/addresses/entities/address.entity";
import { HostEntity } from "src/models/hosts/entities/host.entity";

export class CreateAccountDto{  
    @IsDefined()
    @IsString()
    @IsNotEmpty()   
    @Length(3, 20) 
    firstName: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()   
    @Length(2, 20) 
    lastName: string;
      
    @IsDefined()
    @IsString()
    @IsNotEmpty()    
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @Length(8)     
    //@IsValidPassword()
    password: string;


    @IsDefined() 
    @IsNotEmpty()    
    @ValidateNested()
    address: AddressEntity;
    
    @ValidateNested()
    host: HostEntity; 
}