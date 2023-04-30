import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { name: payload.name, id: payload.sub };
  }
}

@Injectable()
export class ManagerAuthStrategy extends PassportStrategy(Strategy, 'manager_jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    if (payload.exhibition_id) {
      return { name: payload.name, id: payload.sub, exhibition_id: payload.exhibition_id };
    } else {
      throw new UnauthorizedException();
    }
  }
}
