import { IsString, IsEmail, Min, Length } from 'class-validator';

export class CreateUserWithProvider {
    @IsString()
    @Length(2)
    public name: string;

    @IsString()
    @IsEmail()
    public email: string;
}

export class LoginWithOtp {
    @IsString()
    @Length(2)
    public phone: string;
}

export class VerifyOtpDto {
    @IsString()
    @Length(2)
    public phone: string;

    @IsString()
    @Length(2)
    public otp: string;
}
