import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { FindOptionsWhere, Like, MoreThan, Repository } from 'typeorm';
import { UserRole } from 'src/core/enum/user_role.enum';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
      ) {}


    /*
    Adicione os campos de filtro: "Buscar por nome", "Buscar por CNPJ", "Buscar por
    status" (select), e um quarto filtro à sua escolha.
    */
    findAll(role: UserRole, query?: {name?: string, cnpj?: string, isActive?: boolean, startDate?: Date}): Promise<Customer[]> {
        var currentQuery: FindOptionsWhere<Customer>  = role === UserRole.ADMIN ? {} : { isPublic: true };

        if(query?.name) {
            currentQuery = {...currentQuery, name: Like(`%${query.name}%`)};
        }
        if(query?.cnpj) {
            currentQuery = {...currentQuery, cnpj: Like(`%${query.cnpj}%`)};
        }
        if(query?.isActive != undefined) {
            currentQuery = {...currentQuery, isActive: query.isActive};
        }
        if(query?.startDate) {
            currentQuery = {...currentQuery, createdAt: MoreThan(query.startDate)};
        }

        return this.customersRepository.find({
            where: currentQuery, 
        });
    }

    findOne(id: number, role: UserRole): Promise<Customer | null> {
        const acess = role === UserRole.ADMIN ? {} : {isPublic: true};
        return this.customersRepository.findOneBy({ id, ...acess });
    }

    async update(id: number, role: UserRole, customer: UpdateCustomerDto): Promise<undefined> {
        const user = await this.findOne(id, role);
        if(!user) {
            throw new NotFoundException();
        }
        await this.customersRepository.update(id, customer);
    }

    create(customer: CreateCustomerDto): Promise<Customer> {
        return this.customersRepository.save(customer);
    }

    async remove(id: number): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
