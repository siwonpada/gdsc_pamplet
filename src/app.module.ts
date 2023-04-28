import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoothService } from './booth/booth.service';
import { BoothModule } from './booth/booth.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './global/config/database/databaseConfig.module';
import { DatabaseConfigService } from './global/config/database/databaseConfig.service';

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
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService, BoothService],
})
export class AppModule {}
