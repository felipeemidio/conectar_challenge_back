import { UserRole } from '../enum/user_role.enum';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}
