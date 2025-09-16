import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entites/user.entity';
import { LessThan, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    findAll(query?: { role?: string, sortBy?: string, order?: string, inactive?: boolean }): Promise<User[]> {
        let searchOptions = {};
        if(query?.role) {
            searchOptions = {...searchOptions, role: query.role};
        }
        if(query?.inactive ?? false) {
            let date = new Date();
            date.setDate(date.getDate() - 30);
            searchOptions = {...searchOptions, lastLogin: LessThan(date)};
        }
        return this.usersRepository.find({
            order: { [query?.sortBy ?? 'createdAt']: query?.order ?? 'ASC' },
            where: { ...searchOptions }, 
        });
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id }});
    }

    async findOneByEmail(email: string, options?: {addPassword?: boolean}): Promise<User | null> {
        const queryBuilder = this.usersRepository.createQueryBuilder('user');
        if(options?.addPassword ?? false) {
            queryBuilder.addSelect('user.password');
        }

        return queryBuilder.where('user.email = :email', { email }) .getOne();
    }

    async update(id: number, user: UpdateUserDto): Promise<undefined> {
        await this.usersRepository.update(id, user);
    }

    async updateLoginLastDate(id: number): Promise<undefined> {
        await this.usersRepository.update(id, { lastLogin: new Date().toISOString() });
    }

    async create(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
