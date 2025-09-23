'use client'
import { Calendar, CalendarProps, Card } from "antd";
import HeadItem from "./headitem";
import type { Dayjs } from 'dayjs';
import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import { useSelector } from "react-redux";

export default function DashboardPage() {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const themePrimaryColor = useSelector((state:any) => state?.themePrimaryColor);
    const chartDomRefOne = useRef(null);
    const chartDomRefTwo = useRef(null);
    const chartDomRefThree = useRef(null);
    let eChartOne:any = null;
    let eChartTwo:any = null;
    let eChartThree:any = null;
    const handleResize = () => {
        if(eChartOne != null){
            eChartOne.resize();
        }
        if(eChartTwo != null){
            eChartTwo.resize();
        }
        if(eChartThree != null){
            eChartThree.resize();
        }
    }
    const option = {
        title: {
            text: '数据统计'
        },
        xAxis: {
            type: 'category',
            data: ['数据一', '数据二', '数据三', '数据四', '数据五', '数据六','数据七']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ],
        grid:{ // 让图表占满容器
            left:"0px",
            right:"0px",
            bottom:"0px"
        }
    };
    const option2 = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: '数据总趋势'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: [
            {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        grid:{ // 让图表占满容器
            left:"0px",
            right:"0px",
            bottom:"0px"
        },
        series: [
            {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                },
                {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                },
                {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
            },
            {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(55, 162, 255)'
                },
                {
                    offset: 1,
                    color: 'rgb(116, 21, 219)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
            },
            {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(255, 0, 135)'
                },
                {
                    offset: 1,
                    color: 'rgb(135, 0, 157)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
            },
            {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(255, 191, 0)'
                },
                {
                    offset: 1,
                    color: 'rgb(224, 62, 76)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
            }
        ]
    };
    const datas = [
    ////////////////////////////////////////
    [
        { name: '数据1', value: 5.6 },
        { name: '数据2', value: 1 },
        { name: '数据3', value: 0.8 },
        { name: '数据4', value: 0.5 },
        { name: '数据5', value: 0.5 },
        { name: '其它', value: 3.8 }
    ],
    // ////////////////////////////////////////
    [
        { name: '数据1', value: 3.8 },
        { name: '数据2', value: 2.3 },
        { name: '数据4', value: 2.2 },
        { name: '数据5', value: 1.3 },
        { name: '数据6', value: 1.2 },
        { name: '其它', value: 5.7 }
    ],

    ////////////////////////////////////////
    [
        { name: '数据1', value: 3.5 },
        { name: '数据2', value: 2.8 },
        { name: '数据3', value: 1.7 },
        { name: '数据4', value: 1.4 },
        { name: '数据5', value: 0.5 },
        { name: '其它', value: 3.8 }
    ]
    ];

    const option3 = {
    title: {
        text: '数据分布',
    },
    grid:{ // 让图表占满容器
        left:"0px",
        right:"0px",
        bottom:"0px"
    },
    series: datas.map(function (data, idx) {
        var top = idx * 33.3;
        return {
        type: 'pie',
        radius: [20, 60],
        top: top + '%',
        height: '33.33%',
        left: 'center',
        width: 320,
        itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
        },
        label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c} 小时}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
            time: {
                fontSize: 10,
                color: '#999'
            }
            }
        },
        labelLine: {
            length: 5,
            length2: 0,
            maxSurfaceAngle: 80
        },
        labelLayout: function (params:any) {
            const isLeft = params.labelRect.x < eChartThree.getWidth() / 2;
            const points = params.labelLinePoints as number[][];
            // Update the end point.
            points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;

            return {
            labelLinePoints: points
            };
        },
        data: data
        };
    })
    };


    useEffect(()=>{
        eChartOne = echarts.init(chartDomRefOne.current);
        eChartOne.setOption(option);
        eChartTwo = echarts.init(chartDomRefTwo.current);
        eChartTwo.setOption(option2);
        eChartThree = echarts.init(chartDomRefThree.current);
        eChartThree.setOption(option3);
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-w-[1920px] min-h-[1070px] flex flex-col">
            <div className="flex flex-row w-full h-[15%]">
                <div className="w-1/6  p-2 !pl-0">
                    <div className="w-full h-full !rounded-3xl p-5" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"red"}
                            dataPercent={"↑ 3.6%"}
                            data={"90"}
                            dataDesc={"较前日 +256"}
                            echartData={[556, 774, 323, 456, 432, 456, 444]}>
                        </HeadItem>
                    </div>
                </div>
                <div className="w-1/6  p-2">
                   <div className="w-full h-full !rounded-3xl bg-white p-5" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"green"}
                            dataPercent={"↓ 3.6%"}
                            data={"100"}
                            dataDesc={"较前日 -26"}
                            echartData={[112, 533, 332, 553, 754, 554, 334]}>
                        </HeadItem>
                    </div>
                </div>
                <div className="w-1/6  p-2">
                    <div className="w-full h-full !rounded-3xl bg-white p-5" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"green"}
                            dataPercent={"↓ 2.6%"}
                            data={"90"}
                            dataDesc={"较前日 -26"}
                            echartData={[124, 532, 646, 234, 346, 754, 523]}>
                        </HeadItem>
                    </div>
                </div>
                <div className="w-1/6  p-2">
                    <div className="w-full h-full !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"red"}
                            dataPercent={"↑ 6.6%"}
                            data={"90"}
                            dataDesc={"较前日 +26"}
                            echartData={[55, 886, 222, 422, 532, 456, 124]}>
                        </HeadItem>
                    </div>
                </div>
                <div className="w-1/6  p-2">
                    <div className="w-full h-full !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"red"}
                            dataPercent={"↑ 2.8%"}
                            data={"120"}
                            dataDesc={"较前日 +33"}
                            echartData={[241, 567, 222, 456, 321, 234, 1320]}>
                        </HeadItem>
                    </div>
                </div>
                <div className="w-1/6  p-2 !pr-0">
                    <div className="w-full h-full !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                        <HeadItem
                            title={"数据总量"}
                            textColor={"red"}
                            dataPercent={"↑ 2.6%"}
                            data={"90"}
                            dataDesc={"较前日 +26"}
                            echartData={[72, 1330, 934, 1290, 56, 901, 1320]}>
                        </HeadItem>
                    </div>
                </div>

            </div>
            <div className="flex flex-row flex-1 w-full">
                <div className="w-1/6  p-2 !pl-0">
                    <div className="w-full h-full !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                        <Calendar onPanelChange={onPanelChange}/>
                    </div>
                </div>
                <div className="w-2/3  p-2 flex flex-col gap-4">
                    <div ref={chartDomRefTwo} className="h-1/2 w-full  pb-6 !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                    </div>
                    <div ref={chartDomRefOne} className="h-1/2 w-full pb-6 !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}> 
                    </div>
                </div>
                <div className="w-1/6  p-2 !pr-0">
                    <div ref={chartDomRefThree} className="w-full h-full !rounded-3xl bg-white p-6" style={{border:"var(--border-primary)"}}>
                    </div>
                </div>
            </div>
        </div>
    );
}