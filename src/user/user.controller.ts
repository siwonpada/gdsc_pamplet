import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('/')
    async createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    @Patch('/')
    async updateUser(@Body() body: UpdateUserDto) {
        return this.userService.updateUser(body);
    }
}
