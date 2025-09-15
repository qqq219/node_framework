import { GenTableColumnEntity } from "src/system/model/entity/GenTableCloumn.entity";
import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils/gen.tool";

export const reactTypesTem = (options) => {
  const { businessName, functionName, moduleName,className,columns } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  return `

declare namespace API.${upperModuleName} {

  interface ${className} {
    ${getEntity(options.columns)}
  }

  export interface ${className}ListParams {
    ${getEntityListParams(options.columns)}
  }

  export interface ${className}InfoResult {
    code: number;
    msg: string;
    data: ${className};
  }

   export interface ${className}PageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<${className}>;
  }

}
    `;
};

function getEntity(columns:GenTableColumnEntity[]){
  let str = ``;
  columns.forEach(item=>{
    str+=`
    ${item.javaField}:${item.javaType};`
  })
  return str
}
function getEntityListParams(columns:GenTableColumnEntity[]){
  let str = ``;
  columns.forEach(item=>{
    str+=`
    ${item.javaField}:${item.javaType};`
  })
  str+=`
    pageSize?: string;
    current?: string;
  `
  return str
}

