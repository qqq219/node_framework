import { GenTableColumnEntity } from "src/system/model/entity/GenTableCloumn.entity";
import { lowercaseFirstLetter } from "../../utils/gen.tool";


export const serviceTem = (options)=>{
    const {  businessName, functionName, moduleName,className,columns } = options;
    const serviceName = `${className}Service`;
    const serviceInstance = `${className}Service`;
    const lfclassName = lowercaseFirstLetter(className);
    const primaryFiled = columns.find(filed => filed.isPk == "1");
    const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
    return `
import { Injectable } from "@nestjs/common";
import { ${className}Req } from "../model/req/${className}Req";
import { ${className}Dao } from "../dao/${className}.dao";
import { ${className}Dto } from "../model/dto/${className}Dto";
import { ExportTable } from "src/common/utils/export";
@Injectable()
export class ${className}Service {

    constructor(
      private readonly ${lfclassName}Dao:${className}Dao
    ) {
    }
    
    async findList(${lfclassName}Req: ${className}Req) {
      return await this.${lfclassName}Dao.select${className}List(${lfclassName}Req);
    }
    
    async create(create${className}Dto: ${className}Dto) {
      return await this.${lfclassName}Dao.insert${className}(create${className}Dto);
    }
    
    async findOne(id: ${primaryType}) {
      return await this.${lfclassName}Dao.select${className}ById(id);
    }
    
    async update(update${className}Dto: ${className}Dto) {
      return await this.${lfclassName}Dao.update${className}(update${className}Dto);
    }
    
    async remove(idList: ${primaryType}[]) {
      return await this.${lfclassName}Dao.delete${className}ByIds(idList);
    }

     /**
       * 导出${functionName}数据为xlsx文件
       * @param res
       * @param req
       */
      async export(res: Response, req: ${className}Req) {
        Reflect.deleteProperty(req, "current")
        Reflect.deleteProperty(req, "pageSize")
        const [list] = await this.findList(req);
        const options = {
          sheetName: '${functionName}',
          data: list,
          header: [
            ${creatExportHeader(columns)}
          ],
        };
        await ExportTable(options, res as any);
      }

}
`
}

 function creatExportHeader(columns:GenTableColumnEntity[]) {
    let str = ``;

    columns.forEach(item=>{
      str+=`
      { title: '${item.columnComment}', dataIndex: '${item.javaField}' },`
    })

    return str;
  }
