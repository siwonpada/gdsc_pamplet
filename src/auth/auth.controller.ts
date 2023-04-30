import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { BoothGuard } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const { name, password } = loginDto;
    const token = await this.authService.getJWTToken(name, password);
    return { access_token: token };
  }

  @Post('/manager/login')
  async managerLogin(@Query('exhibition_id') exhibition_id:number ,@Body() loginDto: LoginDto): Promise<{ manager_access_token: string }> {
    const { name, password} = loginDto;
    const token = await this.authService.getManagerJWTToken(name, password, exhibition_id);
    return { manager_access_token: token };
  }

  @Get('/test')
  @UseGuards(BoothGuard)
  async test(@Req() req: any) {
    return req.user;
  }
}
