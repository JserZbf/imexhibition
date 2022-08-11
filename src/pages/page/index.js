import React, { useState, useEffect, useRef } from 'react';
import { head, last, sortBy } from 'lodash-es';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less';
import * as echarts from 'echarts';
import moment from 'moment';
import LeftTop from '../leftTop/index';
import LeftCenter from '../leftCenter/index';
import LeftBottom from '../leftBottom/index';
import RightTop from '../rightTop/index';
import RightCenter from '../rightCenter/index';
import RightBottom from '../rightBottom/index';
import Gantt from './gantt';
import mockData from './mock.json';
import { MOMENT_FORMAT, SIM_TIME_STEP, TIMER_INTERVAL } from './constant';
import { getAllData, getQuery } from 'services/home/home';
// 添加请求拦截器
import axios from 'axios';
axios.interceptors.request.use((config) => {
  config.url = config.url;
  let headers = {};
  let token = window.localStorage.getItem('token');
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  return {
    ...config,
    headers,
  };
});

const Home = function (props) {
  const [allData, setAllData] = useState({});
  const [materialTypeSixList, setMaterialTypeSixList] = useState([]);
  const [rightBottomInfor, setRightBottomInfor] = useState({});
  const [finishPlanObj, setFinishPlanObj] = useState({});
  const [diffAlgorithmX, setDiffAlgorithmX] = useState([]);
  const [diffAlgorithmY, setDiffAlgorithmY] = useState([]);
  const [fourWeekFinishRateX, setFourWeekFinishRateX] = useState([]);
  const [fourWeekFinishRateY, setFourWeekFinishRateY] = useState([]);
  const [bigValueLine, setBigValueLine] = useState([]);
  const [bigValueY1, setBigValueY1] = useState([]);
  const [fourWeekOutputStatistics, setFourWeekOutputStatistics] = useState({});
  const [fourWeekEnergyConsumption, setFourWeekEnergyConsumption] = useState({});
  const [fourWeekUseTrend, setFourWeekUseTrend] = useState({});
  const [fourWeekUtilizationRate, setFourWeekUtilizationRate] = useState({});
  const [leftEchart, setLeftEchart] = useState([]);
  const [rightEchart, setRightEchart] = useState([]);
  const [deviceUseTime, setDeviceUseTime] = useState();
  const [outSideOrderDetail, setOutSideOrderDetail] = useState([]);
  const [outSideOrderDetailTimeList, setOutSideOrderDetailTimeList] = useState([]);
  const [outSideScheduleCycle, setOutSideScheduleCycle] = useState(null);
  const [outSideSchedulePattern, setOutSideSchedulePattern] = useState(null);
  const [scheduleTarget, setOutSideScheduleTarget] = useState(null);
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const [deviceCardCount, setDeviceCardCount] = useState(5);
  const [orderCardDetail, setOrderCardDetail] = useState([]);
  const [deviceCardDetail, setDeviceCardDetail] = useState([]);
  const [orderScheduleDetail, setOrderScheduleDetail] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [moniTime, setMoniTime] = useState(null);

  const timerRef = useRef(null);
  const [simTime, setTime] = useState('');

  const addTime = (startTime, endTime) => {
    timerRef.current = setTimeout(() => {
      setTime((prev) => {
        if (!prev) {
          return moment(startTime).format(MOMENT_FORMAT);
        }
        const newDate = moment(prev).add(SIM_TIME_STEP, 'seconds');
        const newDateStr = newDate.format(MOMENT_FORMAT);
        if (newDateStr.includes('00:00:00')) {
          const end = moment(newDate).endOf('day');
          filterData(newDate, end);
        }
        // 增加后的时间大于结束时间 要从头开始
        if (newDate?.valueOf() > endTime?.valueOf()) {
          return moment(startTime).format(MOMENT_FORMAT);
        }
        return newDate.format(MOMENT_FORMAT);
      });
      addTime(startTime, endTime);
    }, TIMER_INTERVAL * 1000);
  };

  // 过滤业务数据
  // 参数为Moment类型
  const filterData = (start, end) => {
    // TODO
    console.log(1, start.format(MOMENT_FORMAT), '----', end.format(MOMENT_FORMAT));
  };
  const initClearTimeout = () => {
    timerRef?.current && clearTimeout(timerRef?.current);
  };
  useEffect(() => {
    return initClearTimeout;
  }, []);

  // let number = 0;
  useEffect(() => {
    const timerIDs = setInterval(() => {
      // number = number + 0.1;
      tick();
    }, 3000);
    return () => {
      clearInterval(timerIDs);
    };
  }, []);
  // let numbers = 0;
  // useEffect(() => {
  //   const timerIDS = setInterval(() => {
  //     numbers = numbers + 1;
  //     ticks(numbers);
  //   }, 10000);
  //   return () => {
  //     clearInterval(timerIDS);
  //   };
  // }, []);
  // let moniCount = 0;
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (moniCount > 420) {
  //       moniCount = 0;
  //     }
  //     moniCount = moniCount + 1;
  //     setCurrentTime(showLeftTime(moniCount)[0]);
  //     setMoniTime(showLeftTime(moniCount)[1]);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  useEffect(() => {
    const obj = {
      source_code: 'SSS',
    };
    getQuery(obj).then((res) => {
      if (res.code == 200) {
        initClearTimeout(); // 返回新的排产结果清空之前的定时器
        const { orderDetail } = res;
        const sortOrderByStartTime = sortBy(orderDetail, (o) => moment(o.planStart)?.valueOf());
        const startTime = moment(head(sortOrderByStartTime)?.planStart).startOf('day');
        const endDay = moment(startTime).endOf('day');
        // 目前暂定结束时间为开始时间 + 7天
        const endTime = moment(endDay).add(7, 'days');
        // 灵活范围-根据订单获取结束时间
        // const endTime = moment(last(sortOrderByStartTime)?.planEnd).startOf('day');
        filterData(moment(startTime), moment(endDay)); // 过滤出排产结果第一天的数据
        addTime(startTime, endTime);

        var cenTimeList = [];
        res.orderDetail.forEach((item) => {
          cenTimeList.push(item.planStart, item.planEnd);
        });
        var newCenTimeList = [...new Set(cenTimeList)];
        setOutSideOrderDetailTimeList(newCenTimeList.sort(sorts));
        setOutSideOrderDetail(res.orderDetail ? res.orderDetail : []);
        setOutSideScheduleCycle(res.scheduleCycle);
        setOutSideSchedulePattern(res.schedulePattern);
        setOutSideScheduleTarget(res.scheduleTarget);
        setAllData(res);
        const oneCen = res.materialDemandList.filter((item) => item.shortNum).slice(0, 6);
        const arrCen = oneCen;
        setMaterialTypeSixList(arrCen); //物料类型六个卡片
        setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics); //右下角信息
        setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics); //计划完成率相关信息
        // const cenY = res.orderStatisticsInfo.algorithmComparisonData.Y.map((item) => {
        //   return Number(-10000 * item);
        // });
        if (
          res.orderStatisticsInfo.algorithmComparisonData &&
          res.orderStatisticsInfo.algorithmComparisonData.Y
        ) {
          setDiffAlgorithmY(
            res.orderStatisticsInfo.algorithmComparisonData &&
              res.orderStatisticsInfo.algorithmComparisonData.Y,
          ); //不同算法对比信息图
          var bigValueLineCen = [];
          const cenYst = JSON.parse(
            JSON.stringify(
              res.orderStatisticsInfo.algorithmComparisonData &&
                res.orderStatisticsInfo.algorithmComparisonData.Y,
            ),
          );
          for (var i = 1; i <= cenYst.length; i++) {
            bigValueLineCen.push(
              Number(
                cenYst.sort(function (a, b) {
                  return b - a;
                })[0],
              ),
            );
          }
          setBigValueLine(bigValueLineCen);
          setDiffAlgorithmX(
            res.orderStatisticsInfo.algorithmComparisonData &&
              res.orderStatisticsInfo.algorithmComparisonData.X,
          );
        }

        setFourWeekFinishRateX(res.orderStatisticsInfo.fourWeekFinishRate.X);
        setFourWeekFinishRateY(
          res.orderStatisticsInfo.fourWeekFinishRate.Y.map((item) => {
            return Number(100 * item);
          }),
        );
        setFourWeekOutputStatistics(res.orderStatisticsInfo.fourWeekOutputStatistics); //aps系统可适应不用加工类型图表
        setFourWeekEnergyConsumption(res.deviceStatisticsInfo.fourWeekEnergyConsumption); //预计设备不同状态图表
        setFourWeekUseTrend(res.deviceStatisticsInfo.fourWeekUseTrend); //最近四周使用率趋势图
        const cenY1 = JSON.parse(JSON.stringify(res.deviceStatisticsInfo.fourWeekUseTrend.Y1));
        var bigValueY1Cen = [];
        for (var i = 1; i <= res.deviceStatisticsInfo.fourWeekUseTrend.Y1.length; i++) {
          bigValueY1Cen.push(
            Number(
              cenY1.sort(function (a, b) {
                return b - a;
              })[0],
            ),
          );
        }
        setBigValueY1(bigValueY1Cen);
        setFourWeekUtilizationRate(res.deviceStatisticsInfo.fourWeekUtilizationRate); //近四周设备利用率变化趋势
        setOrderCardDetail(res.orderCardDetail);
        setDeviceCardDetail(res.deviceCardDetail);
        setOrderScheduleDetail(res.orderScheduleDetail);
        tranOrderCardDetail(res.orderCardDetail); //计划状态卡片四个饼图option
        tranDeviceCardDetail(res.deviceCardDetail); //每台设备卡片十个折线图option、
        setDeviceUseTime(res.deviceStatisticsInfo.deviceUseTime); //机床可用时间
      }
    });
  }, [count]);
  /*   useEffect(() => {
      //console.log(orderCardDetail,'orderCardDetail-currentTime')
     // tranOrderCardDetail(orderCardDetail);
    }, [currentTime]); */
  //   useEffect(() => {
  //     //  getAllData(obj).then((res) => {
  //     // console.log(res, 'res-last-dead');
  //     const res = mockData;
  //     setAllData(res);
  //     setOutSideOrderDetail(res.orderDetail ? res.orderDetail : []);
  //     setOutSideScheduleCycle(res.scheduleCycle);
  //     setOutSideSchedulePattern(res.schedulePattern);
  //     setOutSideScheduleTarget(res.scheduleTarget);
  //     // const oneCen = res.materialDemandList.slice(0, 5).concat({ shortNum: 666, supplyTime: '2022/7/2' })
  //     const oneCen = res.materialDemandList.filter((item) => item.shortNum).slice(0, 6);
  //     const arrCen = oneCen.map((item, index) => {
  //       if (
  //         item.supplyTime == moment(new Date()).format('YYYY/M/DD') ||
  //         item.supplyTime == moment(new Date()).format('YYYY/M/D')
  //       ) {
  //         return {
  //           ...item,
  //           flagBool: true,
  //         };
  //       } else {
  //         return {
  //           ...item,
  //           flagBool: false,
  //         };
  //       }
  //     });
  //     setMaterialTypeSixList(arrCen); //物料类型六个卡片
  //     setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics); //右下角信息
  //     setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics); //计划完成率相关信息
  //     const cenY = res.orderStatisticsInfo.algorithmComparisonData.Y.map((item) => {
  //       return Number(-10000 * item);
  //     });
  //     var bigValueLineCen = [];
  //     for (var i = 1; i <= res.orderStatisticsInfo.algorithmComparisonData.Y.length; i++) {
  //       bigValueLineCen.push(
  //         Number(
  //           -10000 *
  //           res.orderStatisticsInfo.algorithmComparisonData.Y.sort(function (a, b) {
  //             return a - b;
  //           })[0],
  //         ),
  //       );
  //     }
  //     //console.log(bigValueLineCen, 'bigValueLineCenbigValueLineCenbigValueLineCen')
  //     setBigValueLine(bigValueLineCen);
  //     setDiffAlgorithmY(cenY); //不同算法对比信息图
  //     setDiffAlgorithmX(res.orderStatisticsInfo.algorithmComparisonData.X);
  //     setFourWeekFinishRateX(res.orderStatisticsInfo.fourWeekFinishRate.X);
  //     setFourWeekFinishRateY(
  //       res.orderStatisticsInfo.fourWeekFinishRate.Y.map((item) => {
  //         return Number(100 * item);
  //       }),
  //     );
  //     setFourWeekOutputStatistics(res.orderStatisticsInfo.fourWeekOutputStatistics); //aps系统可适应不用加工类型图表
  //     setFourWeekEnergyConsumption(res.deviceStatisticsInfo.fourWeekEnergyConsumption); //预计设备不同状态图表
  //     setFourWeekUseTrend(res.deviceStatisticsInfo.fourWeekUseTrend); //最近四周使用率趋势图
  //     setFourWeekUtilizationRate(res.deviceStatisticsInfo.fourWeekUtilizationRate); //近四周设备利用率变化趋势
  //     setOrderCardDetail(res.orderCardDetail);
  //     setDeviceCardDetail(res.deviceCardDetail);
  //     tranOrderCardDetail(res.orderCardDetail); //计划状态卡片四个饼图option
  //     tranDeviceCardDetail(res.deviceCardDetail); //每台设备卡片十个折线图option、
  //     setDeviceUseTime(res.deviceStatisticsInfo.deviceUseTime); //机床可用时间
  //     // var chartDom = document.getElementById('main');
  //     // myChart = echarts.init(chartDom);
  //   //  axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
  //       // console.log(rawData, 'rawData______________', ROOT_PATH);
  //     //  _rawData = rawData.data;
  //      // setGanTeData(res.orderScheduleDetail);
  //       const cen0 = res.orderScheduleDetail.map((item, index) => {
  //         return {
  //           ...item,
  //           yValue: index,
  //         };
  //       });
  //     /*   var colorList = removeDuplicateColor(cen0).map((item, index) => {
  //         return {
  //           productName: item.productName,
  //           color: color16(),
  //         };
  //       });
  //       var cen1T = []
  //       res.orderScheduleDetail.forEach((item, index) => {
  //         colorList.forEach((item1, index1) => {
  //           if (item.productName == item1.productName) {
  //             cen1T.push({ ...item, currentColor: item1.color, yValue: index })
  //           }
  //         })
  //       });
  //       var cen2 = []
  //       res.orderScheduleDetail.forEach((item, index) => {
  //         colorList.forEach((item1, index1) => {
  //           if (item.productName == item1.productName) {
  //             cen2.push({ ...item, currentColor: item1.color, yValue: index })
  //           }
  //         })
  //       });
  //       var cen3 = []
  //       res.orderScheduleDetail.forEach((item, index) => {
  //         colorList.forEach((item1, index1) => {
  //           if (item.productName == item1.productName) {
  //             cen3.push({ ...item, currentColor: item1.color, yValue: index })
  //           }
  //         })
  //       });
  //       var cen4 = []
  //       res.orderScheduleDetail.forEach((item, index) => {
  //         colorList.forEach((item1, index1) => {
  //           if (item.productName == item1.productName) {
  //             cen4.push({ ...item, currentColor: item1.color, yValue: index })
  //           }
  //         })
  //       }); */
  //       // myChart.setOption((option = makeOption(cen1T, cen2, cen3, cen4)));
  // //    });
  //   }, []);
  const tick = (number) => {
    setCount((n) => n + 1);
  };
  const ticks = (number) => {
    setNum(number);
    const cen = deviceCardCount;
    setDeviceCardCount(cen + 5);
  };
  const sorts = (a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  };
  const compareTime = (stime, etime) => {
    // 转换时间格式，并转换为时间戳
    function tranDate(time) {
      if (time) {
        return new Date(time.replace(/-/g, '/')).getTime();
      }
    }
    // 开始时间
    let startTime = tranDate(stime);
    // 结束时间
    let endTime = tranDate(etime);
    let thisDate = currentTime;
    // 根据选中日期传值，格式为 2018-9-10 20:08
    // let currentTimeCen =
    //   thisDate.getFullYear() +
    //   '-' +
    //   (thisDate.getMonth() + 1) +
    //   '-' +
    //   thisDate.getDate() +
    //   ' ' +
    //   thisDate.getHours() +
    //   ':' +
    //   thisDate.getMinutes();
    let nowTime = tranDate(thisDate);
    // 如果当前时间处于时间段内，返回true，否则返回false
    if (nowTime > startTime && nowTime < endTime) {
      return 'center';
    } else if (nowTime < startTime) {
      return 'left';
    } else if (nowTime > endTime) {
      return 'right';
    }
    return true;
  };
  const GetNumberOfDays = (date1, date2) => {
    //获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
    //  console.log(day, 'day-day-1111111111111111');
    return day;
  };

  const addDate = (dateStr, diffDay) => {
    var dateTime = new Date(dateStr).getTime();
    var diffTimeLong = dateTime + diffDay * 24 * 3600 * 1000;
    var diffTime = new Date(diffTimeLong);
    var m =
      diffTime.getMonth() + 1 < 10 ? '0' + (diffTime.getMonth() + 1) : diffTime.getMonth() + 1;
    var d = diffTime.getDate() < 10 ? '0' + diffTime.getDate() : diffTime.getDate();
    return diffTime.getFullYear() + '-' + m + '-' + d;
  };
  const tranData = (obj) => {
    var startTime = moment(obj.schedualStart).format('YYYY-MM-DD');
    var endTime = moment(obj.schedualEnd).format('YYYY-MM-DD');
    const cen = compareTime(startTime, endTime);
    var value = null;
    var percent = null;
    var processedValue = null;
    var cenValue = obj.productNum / GetNumberOfDays(startTime, endTime);
    if (cen == 'left') {
      value = 0;
      percent = 0 + '%';
      processedValue = 0;
    } else if (cen == 'center') {
      // console.log(startTime, endTime, 'start-endTime');
      // console.log(moment(new Date()).format('YYYY-MM-DD'), 'moment(new Date())');
      // console.log(addDate('2022-07-01', 1),'addDate(startTime, index)-123');
      var tranDatas = GetNumberOfDays(startTime, endTime);
      for (var index = 0; index <= tranDatas; index++) {
        if (moment(currentTime).format('YYYY-MM-DD') == addDate(startTime, index)) {
          //  console.log(moment(new Date()).format('YYYY-MM-DD'),'moment(new Date())');
          //  console.log(addDate(startTime, index),'addDate(startTime, index)');
          value = (obj.productNum / GetNumberOfDays(startTime, endTime)) * index;
          processedValue = ((obj.productNum / GetNumberOfDays(startTime, endTime)) * index).toFixed(
            0,
          );
          percent = ((cenValue / obj.productNum) * 100 * index).toFixed(0) + '%';
          console.log(
            value,
            processedValue,
            percent,
            'value,processedValue,percent----12312132313',
          );
        }
      }
    } else if (cen == 'right') {
      value = 100;
      processedValue = obj.productNum.toFixed(0);
      percent = 100 + '%';
    }
    return [value, percent, processedValue];
  };
  const tranOrderCardDetail = (data) => {
    const totalObj = data.map((item, index) => {
      console.log(tranData(item)[0], 'tranData(item)[0]----tranData(item)[0]');
      return {
        leftEchartsPieInfoOne: item,
        leftEchartsPieOne: {
          title: {
            text: '',
            x: 'center',
            y: 'center',
            textStyle: {
              fontWeight: 'normal',
              color: '#0bb6f0',
              fontSize: 20,
            },
          },
          //backgroundColor: '#011128',
          // backgroundColor:'pink',
          color: ['#eb644b', '#313443', '#fff'],
          tooltip: {
            show: false,
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            show: false,
            itemGap: 12,
            data: ['01', '02'],
          },
          toolbox: {
            show: false,
            feature: {
              mark: {
                show: true,
              },
              dataView: {
                show: true,
                readOnly: false,
              },
              restore: {
                show: true,
              },
              saveAsImage: {
                show: true,
              },
            },
          },
          series: [
            {
              name: 'Line 1',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  shadowBlur: 40,
                  shadowColor: 'rgba(40, 40, 40, 0.5)',
                },
              },
              hoverAnimation: false,
              data: [
                {
                  value: tranData(item)[0],
                  name: '01',
                  itemStyle: {
                    normal: {
                      color: '#6879F7', //已完成的圆环的颜色
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: 'rgba(44,59,70,1)', //未完成的圆环的颜色
                    },
                  },
                  label: {
                    normal: {
                      rich: {
                        a: {
                          color: '#3a7ad5',
                          align: 'center',
                          fontSize: 20,
                          fontWeight: 'bold',
                        },
                        b: {
                          color: '#fff',
                          align: 'center',
                          fontSize: 16,
                        },
                      },
                      formatter: function (params) {
                        const [value, percent, processedValue] = tranData(item);
                        return (
                          '{b|100%}\n\n' +
                          '{b|计划产量' +
                          item.productNum +
                          '件}' +
                          '\n\n{b|' +
                          percent +
                          '}' +
                          '\n\n{b|已加工' +
                          processedValue +
                          '件}'
                        );
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'normal',
                        color: '#fff',
                      },
                    },
                  },
                },
                {
                  value: 100 - tranData(item)[0],
                  name: '',
                  itemStyle: {
                    normal: {
                      color: '#071D58', //未完成的圆环的颜色
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: 'rgba(44,59,70,1)', //未完成的圆环的颜色
                    },
                  },
                },
              ],
            },
            {
              name: 'Line 2',
              type: 'pie',
              animation: false,
              clockWise: false,
              radius: ['80%', '90%'],
              itemStyle: {
                normal: {
                  color: '#7CA9FF', //外层圆环的颜色
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
                emphasis: {
                  color: 'rgba(44,59,70,1)', //外层圆环的颜色
                },
              },
              hoverAnimation: false,
              tooltip: {
                show: false,
              },
              data: [
                {
                  value: 100,
                  name: '02',
                },
              ],
            },
          ],
        },
        yijiagongCount: tranData(item)[1],
        leftEchartsPieInfoOneCurrent: null,
        leftEchartsPieInfoOneSteps: [],
      };
    });
    setLeftEchart(totalObj);
  };
  const tranDeviceCardDetail = (data) => {
    var ciolColor1 = [
      'rgba(8, 177, 255, 1)',
      'rgba(0, 255, 136,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(0, 255, 136,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88,   1)',
    ];
    var ciolColor0 = [
      'rgba(107, 255, 243,  1)',
      'rgba(97,253,196,  1)',

      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',

      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',
      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',
      'rgba(107, 255, 243,  1)',
      'rgba(97,253,196,  1)',

      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',

      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',
      'rgba(107, 255, 243,  1)',
      'rgba(253, 221, 97,  1)',
    ];
    var bottomColor0 = [
      'rgba(8, 177, 255, 0.8)',
      'rgba(0, 255, 136, 0.8)',

      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',

      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',
      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',
      'rgba(8, 177, 255, 0.8)',
      'rgba(0, 255, 136, 0.8)',

      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',

      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',
      'rgba(8, 177, 255, 0.8)',
      'rgba(251, 171, 88, 0.8)',
    ];
    var bottomColor1 = [
      'rgba(107, 255, 243, 0.8)',
      'rgba(100,253,212,0.8)',

      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',

      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',
      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',
      'rgba(107, 255, 243, 0.8)',
      'rgba(100,253,212,0.8)',

      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',

      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',
      'rgba(107, 255, 243, 0.8)',
      'rgba(253, 227, 100,0.8)',
    ];
    var header0 = [
      'rgba(8, 177, 255, 1)',
      'rgba(0, 255, 136, 1)',

      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',

      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',
      'rgba(8, 177, 255, 1)',
      'rgba(0, 255, 136, 1)',

      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',

      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',
      'rgba(8, 177, 255, 1)',
      'rgba(251, 171, 88, 1)',
    ];
    var header1 = [
      'rgba(107, 255, 243, 1)',
      'rgba(100,253,212,1)',

      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',

      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',
      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',
      'rgba(107, 255, 243, 1)',
      'rgba(100,253,212,1)',

      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',

      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',
      'rgba(107, 255, 243, 1)',
      'rgba(253, 227, 100,1)',
    ];
    var bottom = [
      'rgba(31, 194, 252, 0.4)',
      'rgba(0, 255, 136, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(0, 255, 136, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
      'rgba(31, 194, 252, 0.4)',
      'rgba(253, 179, 88, 0.4)',
    ];
    const totalObj = data.map((item, index) => {
      let sumItem = 0;
      item.dayOutput.Y.forEach((item) => {
        sumItem += item;
      });
      let topDataItem = [];
      let bottomDataItem = [];
      item.dayOutput.Y.forEach((item) => {
        topDataItem.push({ name: '', value: sumItem });
        bottomDataItem.push({ name: '', value: sumItem - item });
      });
      return {
        info: {
          deviceName: item.deviceName,
          runTimeRate: (item.runTimeRate * 100).toFixed(2) + '%',
          isFinishMaintain: item.isFinishMaintain,
        },
        production: {
          grid: {
            top: '30%',
            left: '20%',
            right: '25%',
            bottom: '30%',
            // containLabel: true
          },
          tooltip: {
            show: false,
            formatter: function (params) {
              let text =
                '<p  style="font-size:16px;font-weight: 400;color:rgba(255, 255, 255, 1);margin-bottom: 20px;"><span style="display:inline-block;width:10px;height: 10px;background: ' +
                v2L2Chart.color[params.dataIndex] +
                ';border-radius: 50%;margin-right: 10px;"></span>' +
                v2L2Chart.xData[params.dataIndex] +
                '：' +
                v2L2Chart.data[params.dataIndex] +
                '万</p>';
              return text;
            },
            backgroundColor: 'rgba(38, 68, 110, 0.8)',
            padding: 10,
            borderColor: 'rgba(38, 68, 110, 1)',
            textStyle: {
              color: '#fff',
            },
          },
          xAxis: {
            offset: 0,
            position: ['top', 'bottom'],
            data: item.dayOutput.X.map((item) => {
              return item.slice(4, 8);
            }).slice(0, 7),
            show: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3966EA',
                width: 1,
              },
            },
            axisLabel: {
              interval: 1,
              textStyle: {
                color: '#fff',
                fontSize: 14,
                padding: 20,
              },
              margin: 0, //刻度标签与轴线之间的距离。
            },
          },
          yAxis: [
            {
              name: '排产每日产量',
              nameTextStyle: {
                color: '#FFFFFF',
                fontSize: 22,
                padding: 10,
              },
              min: 0,
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#192a44',
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#3966EA',
                  width: 1,
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#FFFFFF',
                  padding: 16,
                },
                formatter: function (value) {
                  if (value === 0) {
                    return value;
                  }
                  return value;
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            //'最低下的圆片',
            {
              name: '最低下的圆片',
              stack: 'a',
              // type: 'pictorialBar',
              // symbolSize: [66, 12],
              // symbolOffset: [0, 6],
              type: 'effectScatter',
              symbolSize: [15, 5],
              symbolOffset: [0, 0],
              z: 22,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 1,
                        color: ciolColor0[params.dataIndex],
                      },
                      {
                        offset: 0,
                        color: ciolColor1[params.dataIndex],
                      },
                    ]);
                  },
                },
              },
              data: item.dayOutput.X.map((item) => {
                return (item = 0);
              }).slice(0, 7),
            },
            //下半截柱状图
            {
              name: '下半截柱状图',
              stack: 'a',
              type: 'bar',
              barWidth: 15,
              z: 2,
              barGap: '-100%',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 1,
                        color: bottomColor1[params.dataIndex],
                      },
                      {
                        offset: 0,
                        color: bottomColor0[params.dataIndex],
                      },
                    ]);
                  },
                },
              },
              data: item.dayOutput.Y.slice(0, 7),
            },
            //替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20'
            {
              name: '替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20',
              // stack: '',
              type: 'bar',
              barWidth: 15,
              barGap: '-100%',
              // stack: '广告',
              itemStyle: {
                color: 'transparent',
              },
              data: item.dayOutput.Y.slice(0, 7),
            },
            //头部1
            {
              name: '头部1',
              stack: 'a',
              type: 'pictorialBar',
              symbolSize: [15, 5],
              symbolOffset: [0, -6],
              z: 22,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 1,
                        color: header1[params.dataIndex],
                      },
                      {
                        offset: 0,
                        color: header0[params.dataIndex],
                      },
                    ]);
                  },
                },
              },
              symbolPosition: 'end',
              label: {
                formatter: '{c} ',
                color: '#fff',
                show: true,
                fontSize: 12,
                fontWeight: 400,
                fontFamily: 'zcool-gdh',
              },
              data: item.dayOutput.Y.slice(0, 7),
            },
            //头部2
            {
              name: '头部2',
              stack: 'a',
              type: 'pictorialBar',
              symbolSize: [15, 5],
              symbolOffset: [0, -6],
              symbolPosition: 'end',
              z: 22,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 1,
                        color: header1[params.dataIndex],
                      },
                      {
                        offset: 0,
                        color: header0[params.dataIndex],
                      },
                    ]);
                  },
                },
              },
              data: topDataItem.slice(0, 7),
            },
            //底色
            {
              name: '底色',
              stack: 'a',
              type: 'bar',
              barWidth: 15,
              z: 2,
              barGap: '-100%',
              // stack: '',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return bottom[params.dataIndex];
                  },
                },
              },
              data: bottomDataItem.slice(0, 7),
            },
          ],
        },
        stateOf: {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '状态占比',
            show: false,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            show: false,
            data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
          },
          toolbox: {
            show: false,
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            top: '30%',
            left: '20%',
            right: '25%',
            bottom: '30%',
            // containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                  color: '#fffff',
                  width: 2,
                },
              },
              axisLabel: {
                //坐标轴刻度标签的相关设置
                interval: 0,
                textStyle: {
                  color: '#fffff',
                  padding: 16,
                  fontSize: 14,
                },
                formatter: function (data) {
                  return data;
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '',
                },
              },
              axisTick: {
                show: false,
              },
              data: item.stateRatio.X,
            },
          ],
          yAxis: [
            {
              name: '状态占比',
              nameTextStyle: {
                color: '#FFFFFF',
                fontSize: 22,
                padding: 10,
              },
              min: 0,
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#192a44',
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#FFFFFF',
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#FFFFFF',
                  padding: 16,
                },
                formatter: function (value) {
                  if (value === 0) {
                    return value;
                  }
                  return value;
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '待机时间',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(40, 182, 240, 1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(83, 132, 222, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(160, 54, 228, 1)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: item.stateRatio.Y1,
            },
            {
              name: '故障维修时间',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0, 221, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(77, 119, 255)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: item.stateRatio.Y2,
            },
            {
              name: '加工时间',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'RGBA(113, 102, 224, 1)',
                  },
                  {
                    offset: 0.5,
                    color: 'RGBA(78, 137, 223, 1)',
                  },
                  {
                    offset: 1,
                    color: 'RGBA(91, 124, 223, 1)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: item.stateRatio.Y3,
            },
          ],
        },
      };
    });
    setRightEchart(totalObj);
  };
  const showLeftTime = (moniCount) => {
    console.log(moniCount, 'moniCount-moniCount');
    if (moniCount < 60) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 1);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 60 && moniCount < 120) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 2);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 120 && moniCount < 180) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 3);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 180 && moniCount < 240) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 4);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 240 && moniCount < 300) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 5);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 300 && moniCount < 360) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 6);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    } else if (moniCount >= 360 && moniCount <= 421) {
      let now = new Date();
      // let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
      let currentTimeCen = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
      // console.log(currentTimeCen, 'currentTimeCen');
      //  console.log(GetDateStr(7), 'GetDateStr(7)');
      if (currentTimeCen.toString() === GetDateStr(7).toString()) {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * -7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      } else {
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * 7);
        let year = now.getFullYear(); // 年
        let month = checkTime(now.getMonth() + 1); // 月 记得要 +1
        let dates = checkTime(now.getDate()); // 日
        let h = checkTime(now.getHours()); // 时
        let m = checkTime(now.getMinutes()); // 分
        let s = checkTime(now.getSeconds()); // 秒
        return [
          year + '-' + month + '-' + dates + ' ' + h + ':' + m,
          year + '/' + month + '/' + dates,
        ];
      }
    }
  };
  // 补零函数：不足10的情况，前面加0
  const checkTime = (i) => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const GetDateStr = (AddDayCount) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return [y, m, d];
  };
  return (
    <div className="wrap">
      <Row>
        <Col span={8}>
          <LeftTop currentTime={simTime} />
          <LeftCenter
            materialDemandList={allData.materialDemandList}
            leftEchart={leftEchart}
            outSideOrderDetail={outSideOrderDetail}
            outSideOrderDetailTimeList={outSideOrderDetailTimeList}
            outSideScheduleCycle={outSideScheduleCycle}
            outSideSchedulePattern={outSideSchedulePattern}
            scheduleTarget={scheduleTarget}
            currentTime={currentTime}
          />
          <LeftBottom
            allData={allData}
            finishPlanObj={finishPlanObj}
            diffAlgorithmX={diffAlgorithmX}
            bigValueLine={bigValueLine}
            diffAlgorithmY={diffAlgorithmY}
            materialTypeSixList={materialTypeSixList}
            currentTime={currentTime}
          />
        </Col>
        <Col span={8} className="center-middle">
          <div className="main-title"></div>
          <div className="digitization-title">
            <div></div>
            <div>
              <p>数字化</p>
              <p>Digitzing</p>
            </div>
          </div>
          <div className="modernization-title">
            <div></div>
            <div>
              <p>现代化</p>
              <p>MODERNIZATION</p>
            </div>
          </div>
          <div id="xuanzhun"></div>
          <div className="left-mess">
            <div>
              •APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。
            </div>
            <div>
              •APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。
            </div>
            <div>
              •APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。
            </div>
          </div>
          <div className="right-mess">
            <div>
              •APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。
            </div>
            <div>
              •APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。
            </div>
          </div>
          <Gantt orderScheduleDetail={orderScheduleDetail ?? []} simTime={simTime} />
          {/* <Gantt orderScheduleDetail={orderScheduleDetail ?? []} /> */}
          {/* <div id="main"></div> */}
        </Col>
        <Col span={8}>
          <RightTop allData={allData} deviceUseTime={deviceUseTime} />
          <RightCenter
            fourWeekFinishRateX={fourWeekFinishRateX}
            fourWeekFinishRateY={fourWeekFinishRateY}
            fourWeekOutputStatistics={fourWeekOutputStatistics}
            fourWeekEnergyConsumption={fourWeekEnergyConsumption}
            fourWeekUseTrend={fourWeekUseTrend}
            fourWeekUtilizationRate={fourWeekUtilizationRate}
            rightEchart={rightEchart}
            bigValueY1={bigValueY1}
          />
          <RightBottom rightBottomInfor={rightBottomInfor} />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(Home);
