import { Type } from "class-transformer";
import { Equals, IsDate, IsDefined, IsEmail, IsNotEmpty, IsString, Length, MaxDate, ValidateIf } from "class-validator";
import { subYears } from "date-fns";

export class CreateAccountDto {  
    
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
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()    
    @MaxDate(subYears(new Date(), 18), { message: 'Guests under the age of 18 are not allowed to create an Airbnb account or book a rental for themselves',})
    birthDate: Date;
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

