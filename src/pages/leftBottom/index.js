import React, { useEffect, useState, useMemo, useRef } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less';
import ReactEchartsCom from '../../components/ReactEcharts/index';
import * as echarts from 'echarts';
import moment from 'moment';
const leftBottom = function (props) {
  const {
    materialTypeLaterList,
    allData,
    finishPlanObj,
    diffAlgorithmX,
    bigValueLine,
    diffAlgorithmY,
    currentTime,
  } = props;
  const finishPlanList = [
    {
      title: '预计交付计划数',
      value: finishPlanObj.deliveryNum,
    },
    {
      title: '预计延迟计划数',
      value: finishPlanObj.delayNum,
    },
    {
      title: '预计提前计划数',
      value: finishPlanObj.aheadNum,
    },
  ];
  const [order, setOrder] = useState([]);
  const [selectAlgorithm, setSelectAlgorithm] = useState(null);
  const [materialTypeListCen, setMaterialTypeListCen] = useState([]);
  const timer = useRef(null);
  const init = () => {
    timer?.current && clearTimeout(timer?.current);
  };
  useEffect(() => {
    //console.log(allData.selectAlgorithm,'allData.selectAlgorithm');
    var selectAlgorithmCen = '';
    if (allData.selectAlgorithm == 0) {
      selectAlgorithmCen = 'SPT';
    } else if (allData.selectAlgorithm == 1) {
      selectAlgorithmCen = 'LPT';
    } else if (allData.selectAlgorithm == 2) {
      selectAlgorithmCen = 'CR';
    } else if (allData.selectAlgorithm == 3) {
      selectAlgorithmCen = 'EDD';
    } else if (allData.selectAlgorithm == 4) {
      selectAlgorithmCen = 'ESD';
    } else if (allData.selectAlgorithm == 5) {
      selectAlgorithmCen = 'PL';
    } else if (allData.selectAlgorithm == 7) {
      selectAlgorithmCen = 'GA';
    }
    setSelectAlgorithm(selectAlgorithmCen);
    setOrder([
      {
        title: '排产订单号',
        value: allData.orderNO,
      },
      {
        title: '选用排产算法',
        value: selectAlgorithmCen,
      },
      {
        title: '是否有保养任务',
        value: allData.isHasMaintenance ? '是' : '否',
      },
      {
        title: '排产目标',
        value:
          allData.scheduleTarget == 1 ? '设备均衡' : allData.scheduleTarget == 2 ? '最快交付' : '',
      },
    ]);
  }, [allData]);
  useEffect(() => {
    if (materialTypeLaterList?.length) {
      init();
      const cenData = materialTypeLaterList.slice(0, 6).map((item, index) => {
        return {
          ...item,
          index: 1,
          delay: 3 * (index + 1),
        };
      });
      setMaterialTypeListCen(cenData);
      materialTypeSixListScroll(12000, cenData);
    }
    return init;
  }, [materialTypeLaterList]);
  const spArray = function (arrCount, arr) {
    var cenArr = [],
      index;
    var arrTotal = arr.concat(arr);
    for (index = 0; index < arrTotal.length; ) {
      console.log(index, index + arrCount, 'index---index');
      cenArr.push(arrTotal.slice(index, (index += arrCount)));
    }
    return cenArr;
  };
  let currentPage = 0;
  const loopData = (arr, newLen) => {
    let len = arr.length;
    let result = len - currentPage;
    let newArr = [];
    if (result > 0 && result < newLen) {
      newArr = [...arr.slice(currentPage, len), ...arr.slice(0, newLen - result)];
      currentPage = newLen - result;
    } else if (result >= newLen) {
      newArr = arr.slice(currentPage, currentPage + newLen);
      currentPage += newLen;
    } else {
      currentPage = 0;
      newArr = arr.slice(currentPage, currentPage + newLen);
    }
    return newArr;
  };
  let currentPage2 = 6;
  let currentIndex2 = -1;
  const loopData2 = (arr, newLen) => {
    let len = arr.length;
    let result = len - currentPage2;
    let newArr = [];
    if (result > 0 && result < newLen) {
      newArr = [...arr.slice(currentPage2, len), ...arr.slice(0, newLen - result)];
      currentPage2 = newLen - result;
    } else if (result >= newLen) {
      newArr = arr.slice(currentPage2, currentPage2 + newLen);
      currentPage2 += newLen;
    } else {
      currentPage2 = 0;
      newArr = arr.slice(currentPage2, currentPage2 + newLen);
    }
    if (currentIndex2 == 5) {
      currentIndex2 = 0;
    } else {
      currentIndex2++;
    }
    return [newArr, currentIndex2];
  };
  const materialTypeSixListScroll = (time, data) => {
    timer.current = setTimeout(() => {
      // const [newArr, currentIndex2] = loopData2(materialTypeLaterList, 1);
      // const newData = newArr.map((item, index) => {
      //   return {
      //     ...item,
      //     index: 1,
      //     delay: 2 * (currentIndex2 + 1),
      //   }
      // })
      // data.splice(currentIndex2, 1, newData[0]);
      setMaterialTypeListCen(
        loopData(materialTypeLaterList, 6).map((item, index) => {
          return {
            ...item,
            index: 1,
            delay: 3 * (index + 1),
          };
        }),
      );
      // console.log(data, 'current-data')
      materialTypeSixListScroll(12000, data);
    }, time);
  };
  const diffOption = useMemo(() => {
    return {
      title: {
        text: '单位（均方差）',
        textStyle: {
          align: 'left',
          color: '#fff',
          fontSize: 14,
        },
        top: '0%',
        left: '2%',
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
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 233,0)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 255, 255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 255, 233,0)',
                },
              ],
              global: false,
            },
          },
        },
      },

      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(7, 86, 246, 1)',
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
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: diffAlgorithmX,
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
            show: true,
            lineStyle: {
              color: 'rgba(7, 86, 246, 1)',
              width: 2,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'RGBA(17, 76, 100, 1)',
            },
          },
        },
      ],
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
              color: 'RGBA(42, 126, 255, 1)',
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
            color: 'rgba(254, 139, 36, 1)',
            borderColor: 'RGBA(137, 80, 35, 1)',
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
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(7, 86, 246, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(5, 108, 128, 0)',
                  },
                ],
                false,
              ),
              // shadowColor: 'rgba(0,202,149, 0.9)',
              shadowBlur: 100,
            },
          },
          data: diffAlgorithmY,
          markPoint: {
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: 'white', //气泡中字体颜色
                },
              },
            },
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
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
              color: 'rgba(254, 139, 36, 1)',
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
            normal: {
              lineStyle: {
                width: 2,
                type: 'dashed',
              },
            },
          },
          tooltip: {
            show: false,
          },

          data: bigValueLine,
        },
      ],
    };
  }, [bigValueLine, diffAlgorithmY, diffAlgorithmX]);
  const averageOption = useMemo(() => {
    var dataArr = finishPlanObj.finishRate * 10;
    var colorSet = {
      color: '#0063E7',
    };
    return {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: '最外部进度条',
          type: 'gauge',
          radius: '80%',
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [
                  dataArr / 10,
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(145,207,255,0)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(145,207,255,0.2)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(145,207,255,1)',
                    },
                  ]),
                ],
                [1, 'rgba(28,128,245,.0)'],
              ],
              width: 3,
            },
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            show: false,
          },
          detail: {
            show: false,
          },
          title: {
            //标题
            show: false,
          },
          data: [
            {
              name: 'title',
              value: (finishPlanObj.finishRate * 10).toFixed(0),
            },
          ],
          pointer: {
            show: false,
          },
          animationDuration: 4000,
        },
        {
          name: '内部阴影',
          type: 'gauge',
          //center: ['20%', '50%'],
          radius: '70%',
          z: 4,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [
                  dataArr / 10,
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(145,207,255,0)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(145,207,255,0.1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(145,207,255,0.3)',
                    },
                  ]),
                ],
                [1, 'rgba(28,128,245,.0)'],
              ],
              width: 80,
            },
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            show: false,
          },
          detail: {
            formatter: function (value) {
              if (value !== 0) {
                return parseInt(value);
              } else {
                return 0;
              }
            },
            offsetCenter: [0, 5],
            textStyle: {
              padding: [0, 0, 0, 0],
              fontSize: 18,
              color: '#EDFFFD',
            },
          },
          pointer: {
            show: false,
          },
        },
        {
          name: '内部圈',
          type: 'gauge',
          z: 2,
          min: 0,
          max: 10,
          splitNumber: 10,
          radius: '70%',
          axisLine: {
            lineStyle: {
              color: [[1, colorSet.color]],
              width: 3,
              shadowColor: 'rgba(145,207,255,.5)',
              shadowBlur: 6,
              shadowOffsetX: 0,
            },
          },
          tooltip: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            show: false,
          },
          detail: {
            show: false,
          },
          title: {
            //标题
            show: true,
            offsetCenter: [0, '65%'], // x, y，单位px
            textStyle: {
              color: '#ddd',
              fontSize: 25,
            },
          },
          data: [
            {
              name: `${(dataArr * 10).toFixed(0) + '%'}`,
              value: dataArr,
            },
          ],
          itemStyle: {
            normal: {
              color: 'rgba(145,207,255,1)',
            },
          },
          pointer: {
            show: true,
            length: '80%',
            radius: '20%',
            width: 3, //指针粗细
          },
          animationDuration: 4000,
        },
        {
          name: '内部刻度',
          type: 'gauge',
          radius: '75%',
          min: 0, //最小刻度
          max: 10, //最大刻度
          splitNumber: 10, //刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: false,
            lineStyle: {
              width: 5,
              color: [[1, '#1087e2']],
            },
          }, //仪表盘轴线
          axisLabel: {
            show: true,
            color: 'rgba(172,207,255,.5)',
            distance: 2,
            fontSize: 12,
            formatter: function (v) {
              switch (v + '') {
                case '0':
                  return '0%';
                case '1':
                  return '10%';
                case '2':
                  return '20%';
                case '3':
                  return '30%';
                case '4':
                  return '40%';
                case '5':
                  return '50%';
                case '6':
                  return '60%';
                case '7':
                  return '70%';
                case '8':
                  return '80%';
                case '9':
                  return '90%';
                case '10':
                  return '100%';
              }
            },
          }, //刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#3CD3FF', //用颜色渐变函数不起作用
              width: 1,
            },
            length: 4,
          }, //刻度样式
          splitLine: {
            show: true,
            length: 8,
            lineStyle: {
              color: '#3CD3FF', //用颜色渐变函数不起作用
            },
          }, //分隔线样式
          detail: {
            show: false,
          },
          pointer: {
            show: false,
          },
          title: {
            //标题
            show: true,
            offsetCenter: [0, '80%'], // x, y，单位px
            textStyle: {
              color: '#ddd',
              fontSize: 25,
            },
          },
          data: [
            {
              name: '7日平均达成率',
              value: dataArr,
            },
          ],
        },
        {
          //指针上的圆
          type: 'pie',
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['0%', '7%'],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: '#3CD3FF',
                },
              },
            },
          ],
        },
      ],
    };
  }, [finishPlanObj]);

  return (
    <div className="left-bottom">
      <Row>
        <Col span={16} className="col-position">
          {/* 14 */}
          <div className="material-type">
            <ul className="material-type-list">
              {materialTypeListCen.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={
                      item.supplyTime == moment(currentTime).format('YYYY-MM-DD')
                        ? `active-li run-li${item.index}`
                        : `li run-li${item.index}`
                    }
                    style={{ animationDelay: item.delay + 's' }}
                  >
                    <p className="title">
                      {item.materialType == 'blank'
                        ? '毛坯'
                        : item.materialType == 'fixture'
                        ? '夹具'
                        : item.materialType == 'tray'
                        ? '托盘'
                        : item.materialType == 'tool'
                        ? '刀具'
                        : ''}
                    </p>
                    <p className="number">
                      <span>缺口数量:</span>
                      <span>{item.shortNum}</span>
                      {/* <span>物料类型:</span>
                      <span>{item.Specs}</span> */}
                    </p>
                    <p className="start-time">
                      <span>最晚到达时间:</span>
                      <span>{item.supplyTime}</span>
                    </p>
                    <p className="time">{item.supplyTime}</p>
                    <div></div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="left-bottom-order">
            <div className="left-bottom-order-infor">
              <div className="jian-tou"></div>
              <span>订单算法基础信息</span>
            </div>
            <div className="left-bottom-order-split"></div>
            <div className="left-bottom-order-list">
              <ul>
                {order.map((item, index) => {
                  return (
                    <li key={index}>
                      <span>{item.title}</span>
                      <span>{item.value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Col>
        <Col span={5} className="plan-finish-mobile">
          <div className="plan-finish-title">计划完成率相关信息</div>
          <div className="plan-finish-infor">
            {finishPlanList.map((item, index) => {
              return (
                <dl key={index}>
                  <dt></dt>
                  <dd>
                    <p>{item.title}</p>
                    <p>{item.value}</p>
                  </dd>
                </dl>
              );
            })}
          </div>
          <ReactEchartsCom
            option={averageOption}
            width={'600px'}
            height={'400px'}
            left={'6px'}
            top={'-67px'}
          />
        </Col>
        <Col span={5} className="diff-infor-mobile">
          <div className="diff-infor-title">
            <p>不同算法对比信息</p>
            <p></p>
          </div>
          <div className="diff-infor-mess">{`六类算法同步测算对比,${selectAlgorithm}算法得出方案${
            allData.scheduleTarget == 1
              ? '机床使用更均衡'
              : allData.scheduleTarget == 2
              ? '订单交付最快'
              : ''
          }`}</div>
          <ReactEchartsCom
            option={diffOption}
            width={'600px'}
            height={'400px'}
            left={'-58px'}
            top={'0px'}
          />
        </Col>
      </Row>
    </div>
  );
};
export default connect()(leftBottom);
