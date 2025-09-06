import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileTypePipe } from "../service/SysFileValidator";
import { ResultData } from "src/common/model/ResultData";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { ConfigService } from "@nestjs/config";


@Controller("system/file")
export class SysFileController {
    
    constructor(
        private readonly configService: ConfigService
    ) {
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndValidate(@UploadedFile(new FileTypePipe()) file: any, ) {
        const filePath = this.configService.get("file.serverPath") || '/static/uploads/'; // 访问静态文件的URL前缀，默认为'/static/uploads/' 
        return ResultData.ok(join(filePath, file.filename));
    }
}