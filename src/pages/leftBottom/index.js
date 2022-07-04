import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'
import ReactEchartsCom from '../../components/ReactEcharts/index'
import * as echarts from 'echarts'
const leftBottom = function (props) {
  const { materialTypeSixList, allData, finishPlanObj, diffAlgorithmX, diffAlgorithmY } = props;
  const finishPlanList = [{
    title: "预计交付计划数",
    value: finishPlanObj.deliveryNum,
  }, {
    title: "预计延迟计划数",
    value: finishPlanObj.delayNum,
  }, {
    title: "预计提前计划数",
    value: finishPlanObj.aheadNum,
  },]
  const [order, setOrder] = useState([])
  useEffect(() => {
    //console.log(allData.selectAlgorithm,'allData.selectAlgorithm');
    var selectAlgorithmCen = ''
    if (allData.selectAlgorithm == 1) {
      selectAlgorithmCen = 'SPT'
    } else if (allData.selectAlgorithm == 2) {
      selectAlgorithmCen = 'LPT'
    } else if (allData.selectAlgorithm == 3) {
      selectAlgorithmCen = 'CR'
    } else if (allData.selectAlgorithm == 4) {
      selectAlgorithmCen = 'EDD'
    } else if (allData.selectAlgorithm == 5) {
      selectAlgorithmCen = 'ESD'
    } else if (allData.selectAlgorithm == 6) {
      selectAlgorithmCen = 'PL'
    } else if (allData.selectAlgorithm == 7) {
      selectAlgorithmCen = 'GA'
    }
    setOrder([
      {
        title: '排产订单号',
        value: allData.orderNO,
      },
      {
        title: '选用排产算法',
        value: selectAlgorithmCen
      }, {
        title: '是否有保养任务',
        value: allData.isHasMaintenance ? '是' : '否'
      },
      {
        title: '排产目标',
        value: allData.scheduleTarget
      }
    ]);
  }, [allData])
  const diffOption = {
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
      data: diffAlgorithmX,
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
        name: '',
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
        // tooltip: {
        //   show: false
        // },
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
        data: diffAlgorithmY,
      },
      {
        name: '',
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

        data: [80.55, 80.55, 80.55, 80.55, 80.55, 80.55, 80.55],
      }
    ]
  };
  return <div className='left-bottom'>
    <Row>
      <Col span={14}>

        <ul className='material-type-list'>
          {
            materialTypeSixList.map((item, index) => {
              return <li key={index} className={item.flagBool ? 'active-li' : 'li'}>
                <p className='title'>物料类型</p>
                <p className='number'>
                  <span>缺口数量:</span>
                  <span>{item.shortNum}</span>
                </p>
                <p className='start-time'>
                  <span>最晚到达时间:</span>
                  <span>{item.supplyTime}</span>
                </p>
                <p className='time'>{item.supplyTime}</p>
                <div></div>
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
          <p></p>
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