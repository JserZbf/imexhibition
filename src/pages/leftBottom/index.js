import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'
import ReactEchartsCom from '../../components/ReactEcharts/index'
import * as echarts from 'echarts'
const leftBottom = function (props) {
  const [materialList, setMaterialList] = useState([
    {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }
  ]);
  const [finishPlanList, setFinishPlanList] = useState([{
    title: "预计交付计划数",
    value: 8,

  }, {
    title: "预计延迟计划数",
    value: 8,
  }, {
    title: "预计提前计划数",
    value: 8,
  },])
  const [order, setOrder] = useState([
    {
      title: '排产订单号',
      value: '10086117818'
    },
    {
      title: '选用排产算法',
      value: 'EDD或其他'
    }, {
      title: '是否有保养任务',
      value: '否'
    },
    {
      title: '排产目标',
      value: '设备使用均衡'
    }
  ])
  const [diffOption, setDiffOption] = useState({

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
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(0, 255, 233,0)'
            }, {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)',
            }, {
              offset: 1,
              color: 'rgba(0, 255, 233,0)'
            }],
            global: false
          }
        },
      },
    },

    xAxis: [{
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(7, 86, 246, 1)',
          width: 2,
        }
      },
      splitArea: {
        // show: true,
        color: '#f00',
        lineStyle: {
          color: '#f00'
        },
      },
      axisLabel: {
        color: '#fff'
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      data: ['A', 'B', 'C', 'D', 'E', 'F'],
    }],
    yAxis: [{
      type: 'value',
      name: '',
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(7, 86, 246, 1)',
          width: 2,
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'RGBA(17, 76, 100, 1)'
        }
      }
    }],
    series: [
      {
        name: '注册总量3',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: "RGBA(42, 126, 255, 1)",
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
          }
        },

        itemStyle: {
          color: "rgba(254, 139, 36, 1)",
          borderColor: "RGBA(137, 80, 35, 1)",
          borderWidth: 4,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
        },
        tooltip: {
          show: false
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(7, 86, 246, 1)'
            }, {
              offset: 1,
              color: 'rgba(5, 108, 128, 0)'
            }
            ], false),
            // shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 100
          }
        },
        data: [201.55, 308.35, 104.02, 109.55, 119.57, 136.14,],
      },
      {
        name: '注册总量2',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'none',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: "rgba(254, 139, 36, 1)",
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
          }
        },

        itemStyle: {

          normal: {
            lineStyle: {
              width: 2,
              type: 'dashed'
            }
          }
        },
        tooltip: {
          show: false
        },

        data: [80.55, 80.55, 80.55, 80.55, 80.55, 80.55],
      }
    ]
  });
  return <div className='left-bottom'>
    <Row>
      <Col span={14}>

        <ul className='material-type-list'>
          {
            materialList.map((item, index) => {
              return <li key={index}>
                <p className='title'>物料类型</p>
                <p className='number'>
                  <span>{item.number}</span>
                  <span></span>
                </p>
                <p className='start-time'>
                  <span>{item.startTime}</span>
                  <span></span>
                </p>
                <p className='time'>{item.time}</p>
              </li>
            })
          }
        </ul>
        <div className='left-bottom-order'>
          <div className='left-bottom-order-infor'>
            <div className='jian-tou'></div>
            <span>订单算法基础信息</span>
          </div>
          <div className='left-bottom-order-split'>

          </div>
          <div className='left-bottom-order-list'>
            <ul>
              {
                order.map((item, index) => {
                  return <li key={index}>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                  </li>
                })
              }
            </ul>
          </div>
        </div>
      </Col>
      <Col span={5}>
        <div className='plan-finish-title'>
          计划完成率相关信息
        </div>
        <div className='plan-finish-infor'>
          {
            finishPlanList.map((item, index) => {
              return <dl key={index}>
                <dt></dt>
                <dd>
                  <p>{item.title}</p>
                  <p>{item.value}</p>
                </dd>
              </dl>
            })
          }
        </div>
        <div className='yield-rate'>

        </div>
      </Col>
      <Col span={5}>
        <div className='diff-infor-title'>
          <p>不同算法对比信息</p>
          <p>增加5种分派规则设备利用率生成对比</p>
        </div>
        <div className='diff-infor-mess'>
          六类算法同步测算比较,EDD算法得出方案机床使用更均衡
        </div>
        <ReactEchartsCom option={diffOption} width={'600px'} left={'-58px'} top={'0px'} />
      </Col>
    </Row>
  </div>
};
export default connect()(leftBottom)