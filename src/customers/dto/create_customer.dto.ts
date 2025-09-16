import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    fantasyName: string;

    @IsBoolean()
    isActive: boolean;

    @IsBoolean()
    isPublic: boolean;
}