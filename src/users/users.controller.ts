import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create_user.dto';
import { encodePassword } from 'src/core/utils/bcyipt';
import { UserRole } from 'src/core/enum/user_role.enum';
import { UpdateUserDto } from './dto/update_user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/')
    findAll(
        @Query('role', new ParseEnumPipe(UserRole, { optional: true })) role?: UserRole,
        @Query('sortBy',new ParseEnumPipe(["name", "createdAt"], { optional: true })) sortBy?: string,
        @Query('order', new ParseEnumPipe(["asc", "desc"], { optional: true })) order?: string,
    ) {
        return this.usersService.findAll({ role, sortBy, order });
    }

    @UseGuards(AuthGuard)
    @Get("/inactives")
    findAllInactives(
        @Query('role', new ParseEnumPipe(UserRole, { optional: true })) role?: UserRole,
        @Query('sortBy',new ParseEnumPipe(["name", "createdAt"], { optional: true })) sortBy?: string,
        @Query('order', new ParseEnumPipe(["asc", "desc"], { optional: true })) order?: string,
    ) {
        return this.usersService.findAll({ role, sortBy, order, inactive: true });
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        const hashPassword = await encodePassword(createUserDto.password);
        createUserDto = { ...createUserDto, password: hashPassword};
        return this.usersService.create(createUserDto);
    }
}
