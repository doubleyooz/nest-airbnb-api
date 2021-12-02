import { Type } from "class-transformer";
import { Equals, IsDate, IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Length, ValidateIf, ValidateNested } from "class-validator";
//import { IsValidPassword } from "src/common/validators/password.validator";
import { AddressEntity } from "src/models/addresses/entities/address.entity";
import { HostEntity } from "src/models/hosts/entities/host.entity";
import { ProfileEntity } from "src/models/profiles/entities/profile.entity";

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
  
    @ValidateNested()
    @Type(() => ProfileEntity)
    profileID: ProfileEntity;
    
    @ValidateNested()
    @Type(() => HostEntity)
    hostID: HostEntity; 
}

export class UpdateAccountDTO {
    @ValidateIf((dto) => dto.firstName !== undefined)
    @IsDefined()
    @IsString()
    @IsNotEmpty()   
    firstName: string;

    @ValidateIf((dto) => dto.lastName !== undefined)
    @IsDefined()
    @IsString()
    @IsNotEmpty()   
    lastName: string;
  
    @ValidateIf((dto) => dto.email !== undefined)
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @Equals(undefined, {
      message:
        'password cannot be updated here, please use the proper endpoint for this operation',
    })
    password: string;
  
    @ValidateIf((dto) => dto.birthDate !== undefined)
    @IsDefined()
    @IsDate()
    @IsNotEmpty()   
    birthDate: Date;
  
    @Equals(undefined, {
        message:
          'createdAt cannot be updated;',
    })    
    createdAt: string;
  
   
}