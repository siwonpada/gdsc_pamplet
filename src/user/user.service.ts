import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    async createUser(body: CreateUserDto) {
        return 'This action adds a new user';
    }

    async updateUser(body: UpdateUserDto) {
        return 'This action updates a user';
    }
}
