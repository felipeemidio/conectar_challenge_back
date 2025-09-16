import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/core/enum/user_role.enum';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';
export declare class CustomersService {
    private customersRepository;
    constructor(customersRepository: Repository<Customer>);
    findAll(role: UserRole, query?: {
        name?: string;
        cnpj?: string;
        isActive?: boolean;
        startDate?: Date;
    }): Promise<Customer[]>;
    findOne(id: number, role: UserRole): Promise<Customer | null>;
    update(id: number, role: UserRole, customer: UpdateCustomerDto): Promise<undefined>;
    create(customer: CreateCustomerDto): Promise<Customer>;
    remove(id: number): Promise<void>;
}
