import { CreateCustomerDto } from "./create_customer.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }