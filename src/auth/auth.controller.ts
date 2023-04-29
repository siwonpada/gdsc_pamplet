import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        const { name, password } = loginDto;
        const token = await this.authService.getJWTToken(name, password);
        return { access_token: token };
    }
}
