import { UserRole } from "src/core/enum/user_role.enum";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
