"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../core/entites/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll(query) {
        let searchOptions = {};
        if (query?.role) {
            searchOptions = { ...searchOptions, role: query.role };
        }
        if (query?.inactive ?? false) {
            let date = new Date();
            date.setDate(date.getDate() - 30);
            searchOptions = { ...searchOptions, lastLogin: (0, typeorm_2.LessThan)(date) };
        }
        return this.usersRepository.find({
            order: { [query?.sortBy ?? 'createdAt']: query?.order ?? 'ASC' },
            where: { ...searchOptions },
        });
    }
    async findOne(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async findOneByEmail(email, options) {
        const queryBuilder = this.usersRepository.createQueryBuilder('user');
        if (options?.addPassword ?? false) {
            queryBuilder.addSelect('user.password');
        }
        return queryBuilder.where('user.email = :email', { email }).getOne();
    }
    async update(id, user) {
        await this.usersRepository.update(id, user);
    }
    async updateLoginLastDate(id) {
        await this.usersRepository.update(id, { lastLogin: new Date().toISOString() });
    }
    async create(user) {
        return this.usersRepository.save(user);
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map