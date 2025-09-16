import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}