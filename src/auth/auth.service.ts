import { Injectable, SerializeOptions, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/core/utils/bcyipt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @SerializeOptions({exposeUnsetFields: true})
    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email, { addPassword: true });
        if (!user || !await comparePassword(pass, user.password)) {
            throw new UnauthorizedException({message: 'Invalid credentials'});
        }
        await this.usersService.updateLoginLastDate(user.id);
        const payload = { sub: user.id, name: user.name, email: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
