import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';
export declare class CustomersController {
    private costumersService;
    constructor(costumersService: CustomersService);
    getCustomers(req: any, name?: string, cnpj?: string, isActive?: boolean, startDate?: Date): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: number, req: any): Promise<import("./entities/customer.entity").Customer | null>;
    create(createCustomerDto: CreateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
    update(req: any, id: number, updateCustomerDto: UpdateCustomerDto): Promise<undefined>;
    reomve(req: any, id: number, updateCustomerDto: UpdateCustomerDto): Promise<void>;
}
