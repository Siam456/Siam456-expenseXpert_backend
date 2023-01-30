import { Length } from 'class-validator';
/* eslint-disable */
import { IsString, Max, Min } from 'class-validator';
export class CreateOtp {
    @IsString()
    public name: string;

    @IsString()
    @Length(11)
    public phone: string;
}
