import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [MulterModule.register({
        dest: './upload',
    }), TypeOrmModule.forFeature([Image])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule {}
