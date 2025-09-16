import { CreateUserDto } from "./create_user.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ["email", "password",] as const)
) { }