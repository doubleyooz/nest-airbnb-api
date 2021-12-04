import { IsDefined, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {  
    
         
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
  
}