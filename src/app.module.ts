import { Module } from '@nestjs/common';
import { BoothModule } from './booth/booth.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './global/config/database/databaseConfig.module';
import { DatabaseConfigService } from './global/config/database/databaseConfig.service';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigModule],
    }),
    BoothModule,
    ExhibitionModule,
    UserModule,
    AuthModule,
    ImageModule,
  ],
})
export class AppModule {}
