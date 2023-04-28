import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoothService } from './booth/booth.service';
import { BoothModule } from './booth/booth.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BoothModule, ExhibitionModule, UserModule],
  controllers: [AppController],
  providers: [AppService, BoothService],
})
export class AppModule {}
