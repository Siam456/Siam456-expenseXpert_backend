/* eslint-disable */
import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    @Min(11)
    public phone: string;

    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export class LoginUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
export class createUserWithOtpDto {
    @IsString()
    public name: string;

    @IsString()
    @Min(11)
    public phone: string;

    @IsEmail()
    public role: string;
}

export class UpdateAvaterDto {
    @IsString()
    @Min(2)
    public avater: string;
}
