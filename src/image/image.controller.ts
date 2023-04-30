import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { ImageService } from './image.service';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Image } from 'src/global/entity/image.entity';

@Controller('image')
@ApiTags('file')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Image> {
    return this.imageService.uploadImg(file);
  }

  @Get('/:id')
  async downloadImg(@Param('id') id: number, @Res() res: Response) {
    return this.imageService.downloadImg(id, res);
  }
}
