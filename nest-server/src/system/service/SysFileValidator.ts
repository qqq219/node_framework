import { PipeTransform, HttpException, HttpStatus, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileTypePipe implements PipeTransform<Express.Multer.File> {

  transform(value: Express.Multer.File, metadata:ArgumentMetadata) {
    // if (value.mimetype === 'image/png') {
    //   throw new HttpException(
    //     '文件类型错误，' + value.mimetype,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    return value;
  }
}
