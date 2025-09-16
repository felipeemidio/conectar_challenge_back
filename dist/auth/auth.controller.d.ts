import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign_in.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signIn(signInDto: SignInDto): Promise<any>;
    getProfile(req: any): Promise<import("../core/entites/user.entity").User | null>;
}
