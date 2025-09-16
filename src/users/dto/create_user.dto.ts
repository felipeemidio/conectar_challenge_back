import { IsEmail, IsString, IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "src/core/enum/user_role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}