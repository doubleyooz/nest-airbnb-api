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
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsDefined()
    @IsNotEmpty()
    tokenVersion: number;
}

export class GoogleDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    lastName: string;
}

