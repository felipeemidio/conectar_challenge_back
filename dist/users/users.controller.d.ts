import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UserRole } from 'src/core/enum/user_role.enum';
import { UpdateUserDto } from './dto/update_user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(role?: UserRole, sortBy?: string, order?: string): Promise<import("../core/entites/user.entity").User[]>;
    findAllInactives(role?: UserRole, sortBy?: string, order?: string): Promise<import("../core/entites/user.entity").User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<undefined>;
    findOne(id: number): Promise<import("../core/entites/user.entity").User | null>;
    create(createUserDto: CreateUserDto): Promise<import("../core/entites/user.entity").User>;
}
