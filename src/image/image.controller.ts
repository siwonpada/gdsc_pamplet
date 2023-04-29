import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImg(file);
  }

  @Get('/download')
  async downloadImg(@Query('id') id: number, @Res() res: Response) {
    return this.imageService.downloadImg(id, res);
  }
}
