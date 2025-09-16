import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseDatePipe, ParseIntPipe, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UserRole } from 'src/core/enum/user_role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';
import { AdminGuard } from 'src/users/guards/admin.guard';

@Controller('customers')
export class CustomersController {
    constructor(private costumersService : CustomersService) {}

    @UseGuards(AuthGuard)
    @Get()
    getCustomers(@Request() req,
        @Query('name') name?: string,
        @Query('cnpj') cnpj?: string,
        @Query('isActive', new ParseBoolPipe({ optional: true })) isActive?: boolean,
        @Query('startDate', new ParseDatePipe({ optional: true })) startDate?: Date,
    ) {
        const role: UserRole = req.user.role;
        console.log(isActive)
        console.log(role)
        return this.costumersService.findAll(role, { name, cnpj, isActive, startDate });
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req){
        const role: UserRole = req.user.role;
        return this.costumersService.findOne(id, role);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Post()
    async create(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto){
        return this.costumersService.create(createCustomerDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Request() req,
        @Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto){
            const role: UserRole = req.user.role;
        return this.costumersService.update(id, role, updateCustomerDto);
    }
    
    @UseGuards(AuthGuard, AdminGuard)
    @Delete(':id')
    async reomve(
        @Request() req,
        @Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto){
            const role: UserRole = req.user.role;
        return this.costumersService.remove(id);
    }
}
