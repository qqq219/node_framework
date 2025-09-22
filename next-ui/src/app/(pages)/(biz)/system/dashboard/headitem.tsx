
'use client'
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;

export type UserFormProps = {
    title:string,
    textColor:string,
    data:string,
    dataPercent:string,
    dataDesc:string,
    echartData:number[]
}

export default function HeadItem(props:UserFormProps) {
    const {title, textColor, dataPercent, data, dataDesc, echartData} = props;
    const chartDomRef = useRef(null);
    let myChart:any = null;
    const option = {
        xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', ''],
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                data: echartData,
                type: 'line',
                areaStyle: {
                    color: textColor,
                    opacity:0.2
                },
                symbol: 'none',
                right: 0,
                backgroundColor: textColor,
                lineStyle: {
                    color: textColor,
                    width: 1
                },
            }
        ],
        grid:{ // 让图表占满容器
            top:"0px",
            left:"0px",
            right:"0px",
            bottom:"0px"
        }
    };
    const handleResize = () => {
        if(myChart != null){
            myChart.resize();
        }
    }
    useEffect(()=>{
        myChart = echarts.init(chartDomRef.current);
        myChart.setOption(option);
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-row h-fit">
                <div className="w-1/2 h-fit text-[1.1rem] font-bold">{title}</div>
                <div className="w-1/2 h-fit text-[1.1rem] flex flex-row justify-end" style={{color:textColor}}>{dataPercent}</div>
            </div>
            <div className="w-full flex flex-row flex-1 items-center">
                <div className="w-1/2 h-fit flex flex-col items-center ">
                    <div className="w-full h-fit text-[0.8rem]" style={{color:textColor}}>{dataDesc}</div>
                     <div className="w-full h-fit mt-2 font-bold">{data}</div>
                </div>
                <div className="w-1/2 h-full flex flex-row items-end">
                    <div ref={chartDomRef} className="w-full h-full flex flex-row justify-end"></div>
                </div>
            </div>
        </div>
    )
}