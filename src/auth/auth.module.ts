import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booth } from 'src/global/entity/booth.entity';
import { Exhibition } from 'src/global/entity/exhibition.entity';
import { User } from 'src/global/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booth, Exhibition, User])],
  providers: [],
  controllers: [],
})
export class AuthModule {}
