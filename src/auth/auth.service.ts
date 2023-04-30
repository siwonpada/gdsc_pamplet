import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Booth } from 'src/global/entity/booth.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Booth)
    private readonly boothRepository: Repository<Booth>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    private readonly jwtService: JwtService,
  ) {}

  async getJWTToken(name: string, password: string): Promise<string> {
    const booth = await this.validateBooth(name, password);
    const payload = { name: booth.name, sub: booth.id, exhibition_id: booth.exhibition.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getManagerJWTToken(name: string, password: string, exhibition_id: number): Promise<string> {
    const booth = await this.validateManagerBooth(name, password, exhibition_id);
    const payload = { name: booth.name, sub: booth.id, exhibition_id: exhibition_id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateBooth(name: string, password: string): Promise<Booth> {
    const booths = await this.boothRepository.find({ where: { name }, select: ['password', 'id', 'name'], relations: ['exhibition'] });
    console.log(booths);
    for (const booth of booths) {
      try {
        const isPasswordMatching = await bcrypt.compare(
          password,
          booth.password,
        );
        if (isPasswordMatching) return booth;
      } catch {
        console.log('error');
      }
    }
    throw new UnauthorizedException();
  }

  async validateManagerBooth(name: string, password: string, exhibition_id: number): Promise<Booth> {
    const booths = await this.validateBooth(name, password);
    const exhibition = await this.exhibitionRepository.findOne({ where: { id: exhibition_id }, relations: ['managerBooth'] });
    if (!exhibition) {
      throw new NotFoundException()
    }
    if (exhibition.managerBooth.id === booths.id) {
      return booths;
    } else {
      throw new UnauthorizedException();
    }
  }
}
