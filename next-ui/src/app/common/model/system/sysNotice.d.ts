

declare namespace API.System {

  interface SysNotice {
    
    noticeId:number;
    noticeTitle:string;
    noticeType:string;
    noticeContent:string;
    status:string;
    remark:string;
    createBy:string;
    createTime:Date;
    updateBy:string;
    updateTime:Date;
  }

  export interface SysNoticeListParams {
    
    noticeId:number;
    noticeTitle:string;
    noticeType:string;
    noticeContent:string;
    status:string;
    remark:string;
    createBy:string;
    createTime:Date;
    updateBy:string;
    updateTime:Date;
    pageSize?: string;
    current?: string;
  
  }

  export interface SysNoticeInfoResult {
    code: number;
    msg: string;
    data: SysNotice;
  }

   export interface SysNoticePageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<SysNotice>;
  }

}
    