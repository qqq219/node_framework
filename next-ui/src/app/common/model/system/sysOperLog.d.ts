

declare namespace API.System {

  interface SysOperLog {
    
    operId:number;
    title:string;
    businessType:string;
    method:string;
    requestMethod:string;
    operatorType:string;
    operName:string;
    deptName:string;
    operUrl:string;
    operIp:string;
    operLocation:string;
    operParam:string;
    jsonResult:string;
    status:string;
    errorMsg:string;
    operTime:Date;
    costTime:number;
  }

  export interface SysOperLogListParams {
    
    operId:number;
    title:string;
    businessType:string;
    method:string;
    requestMethod:string;
    operatorType:string;
    operName:string;
    deptName:string;
    operUrl:string;
    operIp:string;
    operLocation:string;
    operParam:string;
    jsonResult:string;
    status:string;
    errorMsg:string;
    operTime:Date;
    costTime:number;
    pageSize?: string;
    current?: string;
  
  }

  export interface SysOperLogInfoResult {
    code: number;
    msg: string;
    data: SysOperLog;
  }

   export interface SysOperLogPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<SysOperLog>;
  }

}
    