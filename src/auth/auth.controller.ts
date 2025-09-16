import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign_in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.sub)
    }
}
