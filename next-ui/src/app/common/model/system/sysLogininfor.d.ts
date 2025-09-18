

declare namespace API.System {

  interface SysLogininfor {
    
    infoId:number;
    userName:string;
    ipaddr:string;
    loginLocation:string;
    browser:string;
    os:string;
    status:string;
    msg:string;
    loginTime:Date;
  }

  export interface SysLogininforListParams {
    
    infoId:number;
    userName:string;
    ipaddr:string;
    loginLocation:string;
    browser:string;
    os:string;
    status:string;
    msg:string;
    loginTime:Date;
    pageSize?: string;
    current?: string;
  
  }

  export interface SysLogininforInfoResult {
    code: number;
    msg: string;
    data: SysLogininfor;
  }

   export interface SysLogininforPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<SysLogininfor>;
  }

}
    