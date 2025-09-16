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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_2 = require("typeorm");
const user_role_enum_1 = require("../core/enum/user_role.enum");
let CustomersService = class CustomersService {
    customersRepository;
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    findAll(role, query) {
        var currentQuery = role === user_role_enum_1.UserRole.ADMIN ? {} : { isPublic: true };
        if (query?.name) {
            currentQuery = { ...currentQuery, name: (0, typeorm_2.Like)(`%${query.name}%`) };
        }
        if (query?.cnpj) {
            currentQuery = { ...currentQuery, cnpj: (0, typeorm_2.Like)(`%${query.cnpj}%`) };
        }
        if (query?.isActive != undefined) {
            currentQuery = { ...currentQuery, isActive: query.isActive };
        }
        if (query?.startDate) {
            currentQuery = { ...currentQuery, createdAt: (0, typeorm_2.MoreThan)(query.startDate) };
        }
        return this.customersRepository.find({
            where: currentQuery,
        });
    }
    findOne(id, role) {
        const acess = role === user_role_enum_1.UserRole.ADMIN ? {} : { isPublic: true };
        return this.customersRepository.findOneBy({ id, ...acess });
    }
    async update(id, role, customer) {
        const user = await this.findOne(id, role);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        await this.customersRepository.update(id, customer);
    }
    create(customer) {
        return this.customersRepository.save(customer);
    }
    async remove(id) {
        await this.customersRepository.delete(id);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map