import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';

export class SignInDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @Length(8)
    //@IsValidPassword()
    readonly password: string;
}

export class PayloadDto {
    @IsDefined()
    @IsNotEmpty()
    id: number;

    @IsDefined()
    @IsNotEmpty()
    tokenVersion: number;
}
