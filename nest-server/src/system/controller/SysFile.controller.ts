import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "../service/SysFileValidator";


@Controller("system/file")
export class SysFileController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndValidate(@UploadedFile(new FileSizeValidationPipe(),) file: Express.Multer.File, ) {
        return file;
    }
}