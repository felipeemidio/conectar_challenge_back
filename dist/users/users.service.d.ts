import { User } from 'src/core/entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(query?: {
        role?: string;
        sortBy?: string;
        order?: string;
        inactive?: boolean;
    }): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findOneByEmail(email: string, options?: {
        addPassword?: boolean;
    }): Promise<User | null>;
    update(id: number, user: UpdateUserDto): Promise<undefined>;
    updateLoginLastDate(id: number): Promise<undefined>;
    create(user: CreateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
