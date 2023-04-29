import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Booth } from 'src/global/entity/booth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Booth) private readonly boothRepository: Repository<Booth>, 
    private readonly jwtService: JwtService) {}

    async getJWTToken(name: string, password: string): Promise<string> {
        const booth = await this.validateBooth(name, password);
        const payload = { name: booth.name, sub: booth.id };
        const token = this.jwtService.sign(payload);
        return token;
    }

    async validateBooth(name: string, password: string): Promise<Booth> {
        const booth = await this.boothRepository.findOne({ where: { name } });
        if (booth && (await bcrypt.compare(password, booth.password))) {
            return booth;
        }
        throw new UnauthorizedException();
    }


}
