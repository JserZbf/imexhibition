import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less';
import ReactEchartsCom from '../../components/ReactEcharts/index';
import * as echarts from 'echarts';
const rightCenter = function (props) {
  const {
    nan1,
    fourWeekOutputStatistics,
    fourWeekEnergyConsumption,
    fourWeekUseTrend,
    fourWeekUtilizationRate,
    rightEchartsDayOutputOne,
    rightEchartsStateRatioOne,
    rightEchartsDayOutputTwo,
    rightEchartsStateRatioTwo,
    rightEchartsDayOutputThree,
    rightEchartsStateRatioThree,
    rightEchartsDayOutputFour,
    rightEchartsStateRatioFour,
    rightEchartsDayOutputFive,
    rightEchartsStateRatioFive,
    infoOne,
    infoTwo,
    infoThree,
    infoFour,
    infoFive,
  } = props;
  // const [diffOption, setDiffOption] = useState({
  //   title: {
  //     text: '',
  //     textStyle: {
  //       align: 'center',
  //       color: '#fff',
  //       fontSize: 20,
  //     },
  //     top: '5%',
  //     left: 'center',
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       lineStyle: {
  //         color: {
  //           type: 'linear',
  //           x: 0,
  //           y: 0,
  //           x2: 0,
  //           y2: 1,
  //           colorStops: [{
  //             offset: 0,
  //             color: 'rgba(0, 255, 233,0)'
  //           }, {
  //             offset: 0.5,
  //             color: 'rgba(255, 255, 255,1)',
  //           }, {
  //             offset: 1,
  //             color: 'rgba(0, 255, 233,0)'
  //           }],
  //           global: false
  //         }
  //       },
  //     },
  //   },
  //   grid: {
  //     top: '15%',
  //     left: '5%',
  //     right: '5%',
  //     bottom: '15%',
  //     // containLabel: true
  //   },
  //   xAxis: [{
  //     type: 'category',
  //     axisLine: {
  //       lineStyle: {
  //         color: 'rgba(7, 86, 246, 1)',
  //         width: 2,
  //       }
  //     },
  //     splitArea: {
  //       // show: true,
  //       color: '#f00',
  //       lineStyle: {
  //         color: '#f00'
  //       },
  //     },
  //     axisLabel: {
  //       color: '#fff'
  //     },
  //     axisTick: {
  //       show: false,
  //     },
  //     splitLine: {
  //       show: false
  //     },
  //     boundaryGap: false,
  //     data: ['A', 'B', 'C', 'D', 'E', 'F'],
  //   }],
  //   yAxis: [{
  //     type: 'value',
  //     name: '',
  //     axisLabel: {
  //       formatter: '{value}',
  //       textStyle: {
  //         color: '#fff'
  //       }
  //     },
  //     axisLine: {
  //       show: true,
  //       lineStyle: {
  //         color: 'rgba(7, 86, 246, 1)',
  //         width: 2,
  //       }
  //     },
  //     axisTick: {
  //       show: false,
  //     },
  //     splitLine: {
  //       show: false,
  //       lineStyle: {
  //         color: 'RGBA(17, 76, 100, 1)'
  //       }
  //     }
  //   }],
  //   series: [
  //     {
  //       name: '注册总量3',
  //       type: 'line',
  //       smooth: true, //是否平滑
  //       showAllSymbol: true,
  //       // symbol: 'image://./static/images/guang-circle.png',
  //       symbol: 'circle',
  //       symbolSize: 15,
  //       lineStyle: {
  //         normal: {
  //           color: "RGBA(42, 126, 255, 1)",
  //           shadowColor: 'rgba(0, 0, 0, 0)',
  //           shadowBlur: 0,
  //           shadowOffsetY: 5,
  //           shadowOffsetX: 5,
  //         },
  //       },
  //       label: {
  //         show: false,
  //         position: 'top',
  //         textStyle: {
  //           color: '#00ca95',
  //         }
  //       },

  //       itemStyle: {
  //         color: "rgba(254, 139, 36, 1)",
  //         borderColor: "RGBA(137, 80, 35, 1)",
  //         borderWidth: 4,
  //         shadowColor: 'rgba(0, 0, 0, .3)',
  //         shadowBlur: 0,
  //         shadowOffsetY: 0,
  //         shadowOffsetX: 0,
  //       },
  //       tooltip: {
  //         show: false
  //       },
  //       areaStyle: {
  //         normal: {
  //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //             offset: 0,
  //             color: 'rgba(7, 86, 246, 1)'
  //           }, {
  //             offset: 1,
  //             color: 'rgba(5, 108, 128, 0)'
  //           }
  //           ], false),
  //           // shadowColor: 'rgba(0,202,149, 0.9)',
  //           shadowBlur: 100
  //         }
  //       },
  //       data: [201.55, 308.35, 104.02, 109.55, 119.57, 136.14,],
  //     },
  //     {
  //       name: '注册总量2',
  //       type: 'line',
  //       smooth: true, //是否平滑
  //       showAllSymbol: true,
  //       // symbol: 'image://./static/images/guang-circle.png',
  //       symbol: 'none',
  //       symbolSize: 15,
  //       lineStyle: {
  //         normal: {
  //           color: "rgba(254, 139, 36, 1)",
  //           shadowColor: 'rgba(0, 0, 0, 0)',
  //           shadowBlur: 0,
  //           shadowOffsetY: 5,
  //           shadowOffsetX: 5,
  //         },
  //       },
  //       label: {
  //         show: false,
  //         position: 'top',
  //         textStyle: {
  //           color: '#00ca95',
  //         }
  //       },

  //       itemStyle: {

  //         normal: {
  //           lineStyle: {
  //             width: 2,
  //             type: 'dashed'
  //           }
  //         }
  //       },
  //       tooltip: {
  //         show: false
  //       },

  //       data: [80.55, 80.55, 80.55, 80.55, 80.55, 80.55],
  //     }
  //   ]
  // });
  const returnAps = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      show: true,
      x: 'center',
      y: 'bottom',
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6',
      },
      data: [{ name: '加工能耗' }, { name: '待机能耗' }],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    yAxis: [
      {
        type: 'category',
        data: fourWeekEnergyConsumption.X,
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
      },
    ],
    series: [
      {
        name: '加工能耗',
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          borderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#002BB7',
            },
            {
              offset: 1,
              color: '#8FC6FF',
            },
          ]),
        },
        data: fourWeekEnergyConsumption.Y1,
      },
      {
        // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent',
        },
        tooltip: {
          show: false,
        },
        data: fourWeekEnergyConsumption.Y1,
      },
      {
        name: '待机能耗',
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 85, 255, 1)',
            },
            {
              offset: 0.5,
              color: 'rgba(56, 117, 241, 1)',
            },
            {
              offset: 1,
              color: 'rgba(55, 114, 237, 1)',
            },
          ]),
        },
        data: fourWeekEnergyConsumption.Y2,
      },
    ],
  };
  const aps = {
    //  backgroundColor: '#001120',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      show: true,
      x: 'center',
      y: 'bottom',
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6',
      },
      data: [{ name: '故障维修数' }, { name: '加工数' }],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: fourWeekOutputStatistics.X,
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    series: [
      {
        // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        name: '故障维修数',
        type: 'bar',
        barWidth: 30,
        //  barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#002BB7',
            },
            {
              offset: 1,
              color: '#8FC6FF',
            },
          ]),
        },
        data: fourWeekOutputStatistics.Y1,
      },
      {
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          color: 'transparent',
        },
        data: fourWeekOutputStatistics.Y1,
        tooltip: {
          show: false,
        },
      },
      {
        name: '加工数',
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 85, 255, 1)',
            },
            {
              offset: 0.5,
              color: 'rgba(56, 117, 241, 1)',
            },
            {
              offset: 1,
              color: 'rgba(55, 114, 237, 1)',
            },
          ]),
        },
        data: fourWeekOutputStatistics.Y2,
      },
    ],
  };
  const fourWeekPption = {
    title: {
      text: '',
      textStyle: {
        align: 'center',
        color: '#fff',
        fontSize: 20,
      },
      top: '5%',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      show: true,
      x: '180',
      y: 'bottom',
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6',
      },
      data: [{ name: '机床开工率' }, { name: '机床待机率' }, { name: '机床维修率' }],
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      // containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'RGBA(17, 79, 100, 1)',
            width: 2,
          },
        },
        splitArea: {
          // show: true,
          color: '#f00',
          lineStyle: {
            color: '#f00',
          },
        },
        axisLabel: {
          color: '#fff',
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: fourWeekUtilizationRate.X,
      },
    ],

    yAxis: [
      {
        type: 'value',
        name: '',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#27b4c2',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'RGBA(17, 76, 100, 1)',
          },
        },
      },
    ],
    series: [
      {
        name: '机床开工率',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: 'rgba(65, 155, 251, 1)',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
        },
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#00ca95',
          },
        },

        itemStyle: {
          color: '#fff',
          borderColor: 'rgba(65, 155, 251, 1)',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(2, 134, 248, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 107, 255, 0.18)',
                },
              ],
              false,
            ),
            // shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 100,
          },
        },
        data: fourWeekUtilizationRate.Y1,
      },
      {
        name: '机床待机率',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: 'rgba(30, 218, 247, 1)',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
        },
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#00ca95',
          },
        },

        itemStyle: {
          color: '#fff',
          borderColor: 'rgba(2, 191, 248, 1)',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(2, 191, 248, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 185, 255, 0.18)',
                },
              ],
              false,
            ),
            // shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 100,
          },
        },
        data: fourWeekUtilizationRate.Y2,
      },
      {
        name: '机床维修率',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: '#FE8B24',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
        },
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#00ca95',
          },
        },

        itemStyle: {
          color: '#fff',
          borderColor: '#FE8B24',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 161, 19, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 145, 0, 0.18)',
                },
              ],
              false,
            ),
            // shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 100,
          },
        },
        data: fourWeekUtilizationRate.Y3,
      },
    ],
  };
  const fourAps = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    legend: {
      show: true,
      left: 'center',
      bottom: 0,
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6',
      },
      data: ['机床使用率', '最高设备开动率', '最低设备开动率'],
    },
    xAxis: [
      {
        type: 'category',
        data: fourWeekUseTrend.X,
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          symbol: ['none', 'triangle'], //只在末端显示箭头
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
          symbol: ['none', 'triangle'], //只在末端显示箭头
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    series: [
      {
        name: '机床使用率',
        type: 'line',
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: fourWeekUseTrend.Y1,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(60, 123, 253, 1)',
            },
            {
              offset: 1,
              color: 'rgba(146, 182, 255, 0.39)',
            },
          ]),
        },
      },
      {
        name: '最高设备开动率',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: fourWeekUseTrend.Y2,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(60, 176, 253, 1)',
            },
            {
              offset: 1,
              color: 'rgba(146, 248, 255, 0.35)',
            },
          ]),
        },
      },
      {
        name: '最低设备开动率',
        type: 'bar',
        //label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: fourWeekUseTrend.Y3,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(35, 122, 255, 1)',
            },
            {
              offset: 1,
              color: 'rgba(13, 91, 210, 0.16)',
            },
          ]),
        },
      },
    ],
  };
  const maintainList = [
    {
      stateOf: rightEchartsStateRatioOne,
      production: rightEchartsDayOutputOne,
      info: infoOne,
    },
    {
      stateOf: rightEchartsStateRatioTwo,
      production: rightEchartsDayOutputTwo,
      info: infoTwo,
    },
    {
      stateOf: rightEchartsStateRatioThree,
      production: rightEchartsDayOutputThree,
      info: infoThree,
    },
    {
      stateOf: rightEchartsStateRatioFour,
      production: rightEchartsDayOutputFour,
      info: infoFour,
    },
    {
      stateOf: rightEchartsStateRatioFive,
      production: rightEchartsDayOutputFive,
      info: infoFive,
    },
  ];
  return (
    <div className="right-center">
      <Row>
        <Col span={8} className="right-center-part1">
          {maintainList.map((item, index) => {
            return (
              <div key={index} className="maintain-list">
                <div
                  className={
                    item.info.isFinishMaintain == '是' ? 'finish-bao-yang' : 'unfinish-bao-yang'
                  }
                ></div>
                <div className="maintain-back-list">
                  <p>
                    <span>设备名称:</span>
                    <span>{item.info.deviceName}</span>
                  </p>
                  <p>
                    <span>排产周期内机床开动率：</span>
                    <span>{item.info.runTimeRate}</span>
                  </p>
                </div>
                <div>
                  <ReactEchartsCom
                    option={item.production}
                    width={'340px'}
                    height={'250px'}
                    left={'290px'}
                    top={'7px'}
                  />
                </div>
                <div>
                  <ReactEchartsCom
                    option={item.stateOf}
                    width={'340px'}
                    height={'250px'}
                    left={'6px'}
                    top={'2px'}
                  />
                </div>
              </div>
            );
          })}
        </Col>
        <Col span={5} className="right-center-part2">
          <div className="right-center-title">最近四周趋势对比图</div>
          <div className="right-center-mess">APS排产方案较前四周大幅度提高计划完成率</div>
          <div className="right-center-mess-line"></div>
          <ReactEchartsCom
            option={nan1}
            width={'520px'}
            height={'520px'}
            left={'13px'}
            top={'68px'}
          />
          <div className="right-center-mess diff-kind">APS系统可适应不同加工类型</div>
          <div className="right-center-mess-line"></div>
          <ReactEchartsCom option={aps} width={'650px'} height={'400px'} left={'0px'} top={'0px'} />
        </Col>
        <Col span={5} className="right-center-part3">
          <div className="right-center-title">近四周总设备利用率变化趋势图</div>
          <div className="right-center-mess">
            APS系统增高机床开动率,降低机床待机率, 可通过监控机床维修率安排机床保养
          </div>
          <div className="right-center-mess-line"></div>
          <ReactEchartsCom
            option={fourWeekPption}
            width={'650px'}
            height={'327px'}
            left={'0px'}
            top={'66px'}
          />
          <div className="right-center-title diff-cond">预计设备不同状态</div>
          <div className="right-center-mess">可有效观察能耗分布,协助降低能耗大户</div>
          <div className="right-center-mess-line"></div>
          <ReactEchartsCom
            option={returnAps}
            width={'650px'}
            height={'400px'}
            left={'0px'}
            top={'0px'}
          />
        </Col>
        <Col span={6} className="right-center-part4">
          <div className="right-center-title">最近四周使用率趋势图</div>
          <div className="right-center-mess">APS算法强化机床使用率均衡，减弱加工瓶颈</div>
          <div className="right-center-mess-line"></div>
          <ReactEchartsCom
            option={fourAps}
            width={'775px'}
            height={'577px'}
            left={'-58px'}
            top={'0px'}
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(rightCenter);
