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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../auth/auth.guard");
const create_user_dto_1 = require("./dto/create_user.dto");
const bcyipt_1 = require("../core/utils/bcyipt");
const user_role_enum_1 = require("../core/enum/user_role.enum");
const update_user_dto_1 = require("./dto/update_user.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(role, sortBy, order) {
        return this.usersService.findAll({ role, sortBy, order });
    }
    findAllInactives(role, sortBy, order) {
        return this.usersService.findAll({ role, sortBy, order, inactive: true });
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    async create(createUserDto) {
        const hashPassword = await (0, bcyipt_1.encodePassword)(createUserDto.password);
        createUserDto = { ...createUserDto, password: hashPassword };
        return this.usersService.create(createUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('role', new common_1.ParseEnumPipe(user_role_enum_1.UserRole, { optional: true }))),
    __param(1, (0, common_1.Query)('sortBy', new common_1.ParseEnumPipe(["name", "createdAt"], { optional: true }))),
    __param(2, (0, common_1.Query)('order', new common_1.ParseEnumPipe(["asc", "desc"], { optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/inactives"),
    __param(0, (0, common_1.Query)('role', new common_1.ParseEnumPipe(user_role_enum_1.UserRole, { optional: true }))),
    __param(1, (0, common_1.Query)('sortBy', new common_1.ParseEnumPipe(["name", "createdAt"], { optional: true }))),
    __param(2, (0, common_1.Query)('order', new common_1.ParseEnumPipe(["asc", "desc"], { optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllInactives", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map