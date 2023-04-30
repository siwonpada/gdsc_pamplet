import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { User } from 'src/global/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy, ManagerAuthStrategy } from './guard/auth.strategy';
import { BoothGuard } from './guard/auth.guard';
import { ManagerBoothGuard } from './guard/managerAuth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Booth, Exhibition, User]),ConfigModule,JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
    }),
  })],
  providers: [AuthService, AuthStrategy, BoothGuard, ManagerAuthStrategy, ManagerBoothGuard],
  controllers: [AuthController],
})
export class AuthModule {}
