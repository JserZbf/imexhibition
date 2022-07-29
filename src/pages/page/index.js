import React, { useState, useEffect } from 'react';
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
  const [fourWeekOutputStatistics, setFourWeekOutputStatistics] = useState({});
  const [fourWeekEnergyConsumption, setFourWeekEnergyConsumption] = useState({});
  const [fourWeekUseTrend, setFourWeekUseTrend] = useState({});
  const [fourWeekUtilizationRate, setFourWeekUtilizationRate] = useState({});
  const [leftEchart, setLeftEchart] = useState([]);
  const [rightEchart, setRightEchart] = useState([]);
  const [leftEchartsPieOne, setLeftEchartsPieOne] = useState({});
  const [leftEchartsPieTwo, setLeftEchartsPieTwo] = useState({});
  const [leftEchartsPieThree, setLeftEchartsPieThree] = useState({});
  const [leftEchartsPieFour, setLeftEchartsPieFour] = useState({});
  const [leftEchartsPieInfoOne, setLeftEchartsPieInfoOne] = useState({});
  const [leftEchartsPieInfoTwo, setLeftEchartsPieInfoTwo] = useState({});
  const [leftEchartsPieInfoThree, setLeftEchartsPieInfoThree] = useState({});
  const [leftEchartsPieInfoFour, setLeftEchartsPieInfoFour] = useState({});
  const [rightEchartsStateRatioOne, setRightEchartsStateRatioOne] = useState({});
  const [rightEchartsDayOutputOne, setRightEchartsDayOutputOne] = useState({});
  const [rightEchartsStateRatioTwo, setRightEchartsStateRatioTwo] = useState({});
  const [rightEchartsDayOutputTwo, setRightEchartsDayOutputTwo] = useState({});
  const [rightEchartsStateRatioThree, setRightEchartsStateRatioThree] = useState({});
  const [rightEchartsDayOutputThree, setRightEchartsDayOutputThree] = useState({});
  const [rightEchartsStateRatioFour, setRightEchartsStateRatioFour] = useState({});
  const [rightEchartsDayOutputFour, setRightEchartsDayOutputFour] = useState({});
  const [rightEchartsStateRatioFive, setRightEchartsStateRatioFive] = useState({});
  const [rightEchartsDayOutputFive, setRightEchartsDayOutputFive] = useState({});
  const [infoOne, setInfoOne] = useState({});
  const [infoTwo, setInfoTwo] = useState({});
  const [infoThree, setInfoThree] = useState({});
  const [infoFour, setInfoFour] = useState({});
  const [infoFive, setInfoFive] = useState({});
  const [deviceUseTime, setDeviceUseTime] = useState();
  const [ganTeData, setGanTeData] = useState([]);
  const [outSideOrderDetail, setOutSideOrderDetail] = useState([]);
  const [outSideOrderDetailTimeList, setOutSideOrderDetailTimeList] = useState([]);
  const [outSideScheduleCycle, setOutSideScheduleCycle] = useState(null);
  const [outSideSchedulePattern, setOutSideSchedulePattern] = useState(null);
  const [scheduleTarget, setOutSideScheduleTarget] = useState(null);
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const [orderCardCount, setOrderCardCount] = useState(4);
  const [deviceCardCount, setDeviceCardCount] = useState(5);
  const [orderCardDetail, setOrderCardDetail] = useState([]);
  const [deviceCardDetail, setDeviceCardDetail] = useState([]);
  ///甘特图变量
  var ROOT_PATH = 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
  // var chartDom = document.getElementById('main');
  // console.log(chartDom, 'chartDomchartDomchartDomchartDomchartDomchartDomchartDomchartDom');
  // var myChart = echarts.init(chartDom);
  var option;
  var HEIGHT_RATIO = 0.6;
  var DIM_CATEGORY_INDEX = 0;
  var DIM_TIME_ARRIVAL = 1;
  var DIM_TIME_DEPARTURE = 2;
  var DATA_ZOOM_AUTO_MOVE_THROTTLE = 30;
  var DATA_ZOOM_X_INSIDE_INDEX = 1;
  var DATA_ZOOM_Y_INSIDE_INDEX = 3;
  var DATA_ZOOM_AUTO_MOVE_SPEED = 0.2;
  var DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH = 30;
  var _draggable;
  var _draggingEl;
  var _dropShadow;
  var _draggingCursorOffset = [0, 0];
  var _draggingTimeLength;
  var _draggingRecord;
  var _dropRecord;
  var _cartesianXBounds = [];
  var _cartesianYBounds = [];
  var _rawData;
  var _autoDataZoomAnimator;
  var myChart;
  var ganTey;
  // var websock;
  let number = 0;
  useEffect(() => {
    const timerIDs = setInterval(() => {
      number = number + 0.1;
      tick(number);
    }, 3000);
    return () => {
      clearInterval(timerIDs);
    };
  }, []);
  const tick = (number) => {
    setCount(number);
  };
  let numbers = 0;
  useEffect(() => {
    const timerIDS = setInterval(() => {
      numbers = numbers + 1;
      ticks(numbers);
    }, 10000);
    return () => {
      clearInterval(timerIDS);
    };
  }, []);
  const ticks = (number) => {
    setNum(number);
    const cen = deviceCardCount;
    setDeviceCardCount(cen + 5);
  };
  const sorts = (a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  };

  useEffect(() => {
    const obj = {
      source_code: 'SSS',
    };
    getQuery(obj).then((res) => {
      console.log(res.code, 'res.coderes.code');
      if (res.code == 200) {
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
        const arrCen = oneCen.map((item, index) => {
          if (
            item.supplyTime == moment(new Date()).format('YYYY/M/DD') ||
            item.supplyTime == moment(new Date()).format('YYYY/M/D')
          ) {
            return {
              ...item,
              flagBool: true,
            };
          } else {
            return {
              ...item,
              flagBool: false,
            };
          }
        });
        setMaterialTypeSixList(arrCen); //物料类型六个卡片
        setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics); //右下角信息
        setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics); //计划完成率相关信息
        // const cenY = res.orderStatisticsInfo.algorithmComparisonData.Y.map((item) => {
        //   return Number(-10000 * item);
        // });
        setDiffAlgorithmY([]); //不同算法对比信息图
        // setDiffAlgorithmY(res.orderStatisticsInfo.algorithmComparisonData.Y); //不同算法对比信息图
        // var bigValueLineCen = [];
        // const cenYst=JSON.parse(JSON.stringify(res.orderStatisticsInfo.algorithmComparisonData.Y));
        // for (var i = 1; i <= cenYst.length; i++) {
        //   bigValueLineCen.push(
        //     Number(
        //       cenYst.sort(function (a, b) {
        //         return b-a;
        //       })[0],
        //     ),
        //   );
        // }
        //console.log(bigValueLineCen, 'bigValueLineCenbigValueLineCenbigValueLineCen')
        //  setBigValueLine(bigValueLineCen);
        setBigValueLine([]);
        setDiffAlgorithmX([]);
        //  setDiffAlgorithmX(res.orderStatisticsInfo.algorithmComparisonData.X);
        setFourWeekFinishRateX(res.orderStatisticsInfo.fourWeekFinishRate.X);
        setFourWeekFinishRateY(
          res.orderStatisticsInfo.fourWeekFinishRate.Y.map((item) => {
            return Number(100 * item);
          }),
        );
        setFourWeekOutputStatistics(res.orderStatisticsInfo.fourWeekOutputStatistics); //aps系统可适应不用加工类型图表
        setFourWeekEnergyConsumption(res.deviceStatisticsInfo.fourWeekEnergyConsumption); //预计设备不同状态图表
        setFourWeekUseTrend(res.deviceStatisticsInfo.fourWeekUseTrend); //最近四周使用率趋势图
        setFourWeekUtilizationRate(res.deviceStatisticsInfo.fourWeekUtilizationRate); //近四周设备利用率变化趋势
        setOrderCardDetail(res.orderCardDetail);
        setDeviceCardDetail(res.deviceCardDetail);
        tranOrderCardDetail(res.orderCardDetail); //计划状态卡片四个饼图option
        tranDeviceCardDetail(res.deviceCardDetail); //每台设备卡片十个折线图option、
        setDeviceUseTime(res.deviceStatisticsInfo.deviceUseTime); //机床可用时间
        // var chartDom = document.getElementById('main');
        // myChart = echarts.init(chartDom);
        // axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
        //   //console.log(rawData, 'rawData______________', ROOT_PATH);
        //   _rawData = rawData.data;
        //   setGanTeData(res.orderScheduleDetail);
        //   var cen1T = res.orderScheduleDetail.map((item, index) => {
        //     return {
        //       ...item,
        //       currentColor: color16(),
        //       yValue: index,
        //     };
        //   });
        //   const cen2 = res.orderScheduleDetail.map((item, index) => {
        //     return {
        //       ...item,
        //       currentColor: cen1T[index].currentColor,
        //       yValue: index,
        //     };
        //   });
        //   const cen3 = res.orderScheduleDetail.map((item, index) => {
        //     return {
        //       ...item,
        //       currentColor: cen1T[index].currentColor,
        //       yValue: index,
        //     };
        //   });
        //   const cen4 = res.orderScheduleDetail.map((item, index) => {
        //     return {
        //       ...item,
        //       currentColor: cen1T[index].currentColor,
        //       yValue: index,
        //     };
        //   });
        //   myChart.setOption((option = makeOption(cen1T, cen2, cen3, cen4)));
        //   initDrag();
        // });
      }
    });
  }, [count]);
  // useEffect(() => {
  //   //  getAllData(obj).then((res) => {
  //   // console.log(res, 'res-last-dead');
  //   const res = mockData;
  //   setAllData(res);
  //   setOutSideOrderDetail(res.orderDetail ? res.orderDetail : []);
  //   setOutSideScheduleCycle(res.scheduleCycle);
  //   setOutSideSchedulePattern(res.schedulePattern);
  //   setOutSideScheduleTarget(res.scheduleTarget);
  //   // const oneCen = res.materialDemandList.slice(0, 5).concat({ shortNum: 666, supplyTime: '2022/7/2' })
  //   const oneCen = res.materialDemandList.filter((item) => item.shortNum).slice(0, 6);
  //   const arrCen = oneCen.map((item, index) => {
  //     if (
  //       item.supplyTime == moment(new Date()).format('YYYY/M/DD') ||
  //       item.supplyTime == moment(new Date()).format('YYYY/M/D')
  //     ) {
  //       return {
  //         ...item,
  //         flagBool: true,
  //       };
  //     } else {
  //       return {
  //         ...item,
  //         flagBool: false,
  //       };
  //     }
  //   });
  //   setMaterialTypeSixList(arrCen); //物料类型六个卡片
  //   setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics); //右下角信息
  //   setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics); //计划完成率相关信息
  //   const cenY = res.orderStatisticsInfo.algorithmComparisonData.Y.map((item) => {
  //     return Number(-10000 * item);
  //   });
  //   var bigValueLineCen = [];
  //   for (var i = 1; i <= res.orderStatisticsInfo.algorithmComparisonData.Y.length; i++) {
  //     bigValueLineCen.push(
  //       Number(
  //         -10000 *
  //         res.orderStatisticsInfo.algorithmComparisonData.Y.sort(function (a, b) {
  //           return a - b;
  //         })[0],
  //       ),
  //     );
  //   }
  //   //console.log(bigValueLineCen, 'bigValueLineCenbigValueLineCenbigValueLineCen')
  //   setBigValueLine(bigValueLineCen);
  //   setDiffAlgorithmY(cenY); //不同算法对比信息图
  //   setDiffAlgorithmX(res.orderStatisticsInfo.algorithmComparisonData.X);
  //   setFourWeekFinishRateX(res.orderStatisticsInfo.fourWeekFinishRate.X);
  //   setFourWeekFinishRateY(
  //     res.orderStatisticsInfo.fourWeekFinishRate.Y.map((item) => {
  //       return Number(100 * item);
  //     }),
  //   );
  //   setFourWeekOutputStatistics(res.orderStatisticsInfo.fourWeekOutputStatistics); //aps系统可适应不用加工类型图表
  //   setFourWeekEnergyConsumption(res.deviceStatisticsInfo.fourWeekEnergyConsumption); //预计设备不同状态图表
  //   setFourWeekUseTrend(res.deviceStatisticsInfo.fourWeekUseTrend); //最近四周使用率趋势图
  //   setFourWeekUtilizationRate(res.deviceStatisticsInfo.fourWeekUtilizationRate); //近四周设备利用率变化趋势
  //   setOrderCardDetail(res.orderCardDetail);
  //   setDeviceCardDetail(res.deviceCardDetail);
  //   tranOrderCardDetail(res.orderCardDetail); //计划状态卡片四个饼图option
  //   tranDeviceCardDetail(res.deviceCardDetail); //每台设备卡片十个折线图option、
  //   setDeviceUseTime(res.deviceStatisticsInfo.deviceUseTime); //机床可用时间
  //   // var chartDom = document.getElementById('main');
  //   // myChart = echarts.init(chartDom);
  //   axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
  //     // console.log(rawData, 'rawData______________', ROOT_PATH);
  //     _rawData = rawData.data;
  //     setGanTeData(res.orderScheduleDetail);
  //     const cen0 = res.orderScheduleDetail.map((item, index) => {
  //       return {
  //         ...item,
  //         yValue: index,
  //       };
  //     });
  //     var colorList = removeDuplicateColor(cen0).map((item, index) => {
  //       return {
  //         productName: item.productName,
  //         color: color16(),
  //       };
  //     });
  //     var cen1T = []
  //     res.orderScheduleDetail.forEach((item, index) => {
  //       colorList.forEach((item1, index1) => {
  //         if (item.productName == item1.productName) {
  //           cen1T.push({ ...item, currentColor: item1.color, yValue: index })
  //         }
  //       })
  //     });
  //     var cen2 = []
  //     res.orderScheduleDetail.forEach((item, index) => {
  //       colorList.forEach((item1, index1) => {
  //         if (item.productName == item1.productName) {
  //           cen2.push({ ...item, currentColor: item1.color, yValue: index })
  //         }
  //       })
  //     });
  //     var cen3 = []
  //     res.orderScheduleDetail.forEach((item, index) => {
  //       colorList.forEach((item1, index1) => {
  //         if (item.productName == item1.productName) {
  //           cen3.push({ ...item, currentColor: item1.color, yValue: index })
  //         }
  //       })
  //     });
  //     var cen4 = []
  //     res.orderScheduleDetail.forEach((item, index) => {
  //       colorList.forEach((item1, index1) => {
  //         if (item.productName == item1.productName) {
  //           cen4.push({ ...item, currentColor: item1.color, yValue: index })
  //         }
  //       })
  //     });
  //     // myChart.setOption((option = makeOption(cen1T, cen2, cen3, cen4)));
  //   });
  // }, []);
  useEffect(() => {
    console.log(deviceCardCount, 'deviceCardCount');
    //tranDeviceCardDetail(0,5);
  }, [num]);
  /*   const initWebSocket = () => {
      console.log(document.domain, location.port, 'websocket连接了');
      //初始化weosocket
      let Ip = window.location.host
      //这里的wsuri是根据服务端的ip进行配置（开发环境），生产环境的话可以使用上面的Ip或者是nginx做代理
      //  const wsuri = `ws://192.168.20.28:10068/websocket/power`;      //协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。 
      // const wsuri = `ws://${Ip}/ws/${localStorage.getItem('name')}`;  
      const wsuri = "ws:" + '//' + document.domain + ':' + location.port+'/dcenter';
      websock = new WebSocket(wsuri);
      websock.onmessage = websocketonmessage;
      websock.onopen = websocketonopen;
      websock.onerror = websocketonerror;
      websock.onclose = websocketclose;
    };
    const websocketsend = () => {//数据发送
      // let msg=JSON.stringify(111111);
      // this.websock.send(msg);
    };
    const websocketonopen = () => { //连接建立之后执行send方法发送数据
    };
    const websocketonerror = (error) => {//连接建立失败重连
      initWebSocket();
    };
    const websocketonmessage = (e) => { //数据接收
      console.log(e, '接受了');
    };
    const websocketclose = (e) => {  //关闭
      websock.close();
    } */
  const compareTime = (stime, etime, nowTime1) => {
    // 转换时间格式，并转换为时间戳
    function tranDate(time) {
      return new Date(time.replace(/-/g, '/')).getTime();
    }
    // 开始时间
    let startTime = tranDate(stime);
    // 结束时间
    let endTime = tranDate(etime);
    let thisDate = nowTime1;
    // 根据选中日期传值，格式为 2018-9-10 20:08
    let currentTime =
      thisDate.getFullYear() +
      '-' +
      (thisDate.getMonth() + 1) +
      '-' +
      thisDate.getDate() +
      ' ' +
      thisDate.getHours() +
      ':' +
      thisDate.getMinutes();
    let nowTime = tranDate(currentTime);
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
  const color16 = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
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
    const cen = compareTime(startTime, endTime, new Date());
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
        if (moment(new Date()).format('YYYY-MM-DD') == addDate(startTime, index)) {
          //  console.log(moment(new Date()).format('YYYY-MM-DD'),'moment(new Date())');
          //  console.log(addDate(startTime, index),'addDate(startTime, index)');
          value = (obj.productNum / GetNumberOfDays(startTime, endTime)) * index;
          processedValue = (obj.productNum / GetNumberOfDays(startTime, endTime)) * index;
          percent = (cenValue / obj.productNum) * 100 * index + '%';
        }
      }
    } else if (cen == 'right') {
      value = 100;
      processedValue = obj.productNum;
      percent = 100 + '%';
    }
    return [value, percent, processedValue];
  };
  const tranOrderCardDetail = (data) => {
    const totalObj = data.map((item, index) => {
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
                          data[0].productNum +
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
        leftEchartsPieInfoOneCurrent: null,
        leftEchartsPieInfoOneSteps: [],
      };
    });
    setLeftEchart(totalObj);
    setLeftEchartsPieInfoOne(data[0]);
    setLeftEchartsPieInfoTwo(data[1]);
    setLeftEchartsPieInfoThree(data[2]);
    setLeftEchartsPieInfoFour(data[3]);
    const echartsList1 = {
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
              value: tranData(data[0])[0],
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
                    console.log(tranData(data[0]), 'tranData(data[0])');
                    const [value, percent, processedValue] = tranData(data[0]);
                    return (
                      '{b|100%}\n\n' +
                      '{b|计划产量' +
                      data[0].productNum +
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
              value: 100 - tranData(data[0])[0],
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
    };
    setLeftEchartsPieOne(echartsList1);
    const echartsList2 = {
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
              value: tranData(data[1])[0],
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
                    const [value, percent, processedValue] = tranData(data[1]);
                    return (
                      '{b|100%}\n\n' +
                      '{b|计划产量' +
                      data[1].productNum +
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
              value: 100 - tranData(data[1])[0],
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
    };
    setLeftEchartsPieTwo(echartsList2);
    const echartsList3 = {
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
              value: tranData(data[2])[0],
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
                    const [value, percent, processedValue] = tranData(data[2]);
                    return (
                      '{b|100%}\n\n' +
                      '{b|计划产量' +
                      data[2].productNum +
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
              value: 100 - tranData(data[2])[0],
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
    };
    setLeftEchartsPieThree(echartsList3);
    const echartsList4 = {
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
                const [value, percent, processedValue] = tranData(data[3]);
                return (
                  '{b|100%}\n\n' +
                  '{b|计划产量' +
                  data[3].productNum +
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
          hoverAnimation: false,
          data: [
            {
              value: tranData(data[3])[0],
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
            },
            {
              value: 100 - tranData(data[3])[0],
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
    };
    setLeftEchartsPieFour(echartsList4);
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
            }),
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
                fontSize: 12,
                padding: 16,
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
              }),
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
              data: item.dayOutput.Y,
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
              data: item.dayOutput.Y,
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
              data: item.dayOutput.Y,
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
              data: topDataItem,
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
              data: bottomDataItem,
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
  var removeDuplicateDataDimensions = ['Index', '开始时间', '结束时间', '机床名称'];
  function removeDuplicateData(arr) {
    for (var i = 0; i < arr.length; i++) {
      // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {
        // 再次遍历数组
        if (arr[i].machineName == arr[j].machineName) {
          // 判断连个值是否相等
          arr[j].yValue = arr[i].yValue;
        }
      }
    }
    var xAxisListCen = [...new Set(arr)].sort(sorts);
    return xAxisListCen;
  }
  function removeDuplicateY1(arr) {
    for (var i = 0; i < arr.length; i++) {
      // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {
        // 再次遍历数组
        if (arr[i].machineName == arr[j].machineName) {
          // 判断连个值是否相等
          arr.splice(j, 1); // 相等删除后者
          j--;
        }
      }
    }
    return arr;
  }
  function removeDuplicateY2(arr) {
    for (var i = 0; i < arr.length; i++) {
      // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {
        // 再次遍历数组
        if (arr[i].productName == arr[j].productName) {
          // 判断连个值是否相等
          arr.splice(j, 1); // 相等删除后者
          j--;
        }
      }
    }
    return arr;
  }
  function removeDuplicateColor(arr) {
    for (var i = 0; i < arr.length; i++) {
      // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {
        // 再次遍历数组
        if (arr[i].productName == arr[j].productName) {
          // 判断连个值是否相等
          arr.splice(j, 1); // 相等删除后者
          j--;
        }
      }
    }
    return arr;
  }
  function removeDuplicateY3(arr) {
    //  console.log(arr,'arr-00000000000000000');
    for (var i = 0; i < arr.length; i++) {
      // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {
        // 再次遍历数组
        if (arr[i].productName == arr[j].productName) {
          // 判断连个值是否相等
          arr.splice(j, 1); // 相等删除后者
          j--;
        }
      }
    }
    return arr;
  }
  function makeOption(data1, data2, data3, data4) {
    // const aaa=data1.find(item=>item.machineName=='清洗机');
    console.log(data1, 'aa清洗');
    return {
      tooltip: {},
      animation: false,
      grid: {
        show: true,
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      xAxis: [
        {
          type: 'category',
          position: 'bottom',
          splitLine: {
            lineStyle: {
              color: ['#E9EDFF'],
            },
          },
          //data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              color: '#929ABA',
            },
          },
          axisLabel: {
            color: '#929ABA',
            inside: false,
            align: 'center',
          },
        },
      ],
      yAxis: {
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        min: 0,
        max: _rawData.parkingApron.data.length,
      },
      series: [
        {
          //内容值
          id: 'flightDataCenter',
          type: 'custom',
          renderItem: renderGanttItem,
          dimensions: removeDuplicateDataDimensions,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
          },
          // data: data1.map((item, index) => {
          //   return [index + 150].concat(item.startTime, item.endTime, item.machineName, item.currentColor);//左右颜色
          // })
          data: removeDuplicateData(data1).map((item, index) => {
            return [item.yValue + 310].concat(
              item.startTime,
              item.endTime,
              item.opName,
              item.opName,
              item.currentColor,
            ); //左右颜色
          }),
        },
        {
          //y1轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY1,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0,
          },
          // data: _rawData.parkingApron.data.map(function (item, index) {
          //   return [index].concat(item);
          // }),
          data: removeDuplicateY1(data2).map((item, index) => {
            return [index + 310].concat(item.machineName);
          }),
        },
        {
          //y2轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY2,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0,
          },
          data: removeDuplicateY2(data3).map((item, index) => {
            return [index + 310].concat(item.productName);
          }),
        },
        {
          //y3轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY3,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0,
          },
          data: removeDuplicateY3(data4).map((item, index) => {
            return [index + 310].concat(item.currentColor);
          }),
        },
      ],
    };
  }
  function renderGanttItem(params, api) {
    // console.log(params, api,'line________line');
    var categoryIndex = api.value(DIM_CATEGORY_INDEX);
    var timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex]);
    var timeDeparture = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex]);
    var coordSys = params.coordSys;
    _cartesianXBounds[0] = coordSys.x;
    _cartesianXBounds[1] = coordSys.x + coordSys.width;
    _cartesianYBounds[0] = coordSys.y;
    _cartesianYBounds[1] = coordSys.y + coordSys.height;
    var barLength = timeDeparture[0] - timeArrival[0];
    // Get the heigth corresponds to length 1 on y axis.
    var barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;
    var x = timeArrival[0];
    var y = timeArrival[1] - barHeight;
    var flightNumber = api.value(4) + '';
    var flightNumberWidth = echarts.format.getTextRect(flightNumber).width;
    var text = barLength > flightNumberWidth + 40 && x + barLength >= 180 ? flightNumber : '';
    // data1.map((item, index) => {
    var rectNormal = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: barHeight,
    });
    var rectVIP = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength / 2,
      height: barHeight,
    });
    var rectText = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: barHeight,
    });
    return {
      type: 'group',
      children: [
        {
          type: 'rect',
          ignore: !rectNormal,
          shape: rectNormal,
          style: api.style({
            //右边颜色
            fill: api.value(5),
          }),
        },
        {
          type: 'rect',
          ignore: !rectVIP && !api.value(5),
          shape: rectVIP,
          style: api.style({
            //左边颜色
            fill: api.value(5),
          }),
        },
        {
          type: 'rect',
          ignore: !rectText,
          shape: rectText,
          style: api.style({
            fill: 'transparent',
            stroke: 'transparent',
            text: text,
            textFill: 'white',
          }),
        },
      ],
    };
    // })
  }
  function renderAxisLabelItemY1(params, api) {
    var y = api.coord([0, api.value(0)])[1];
    if (y < params.coordSys.y + 5) {
      return;
    }
    return {
      type: 'group',
      position: [100, y],
      children: [
        {
          type: 'text',
          style: {
            x: 24,
            y: -3,
            text: api.value(1),
            textVerticalAlign: 'bottom',
            textAlign: 'center',
            textFill: '#FFFFFF',
          },
        },
      ],
    };
  }
  function renderAxisLabelItemY2(params, api) {
    var y = api.coord([0, api.value(0)])[1];
    if (y < params.coordSys.y + 5) {
      return;
    }
    return {
      type: 'group',
      position: [2190, y],
      children: [
        {
          type: 'text',
          style: {
            x: 24,
            y: -3,
            text: api.value(1),
            textVerticalAlign: 'bottom',
            textAlign: 'center',
            textFill: '#FFFFFF',
          },
        },
      ],
    };
  }
  function renderAxisLabelItemY3(params, api) {
    var y = api.coord([0, api.value(0)])[1];
    if (y < params.coordSys.y + 5) {
      return;
    }
    return {
      type: 'group',
      position: [2150, y],
      children: [
        {
          type: 'rect',
          shape: {
            d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
            x: 0,
            y: -20,
            width: 20,
            height: 20,
            layout: 'cover',
          },
          style: {
            fill: api.value(1),
          },
        },
      ],
    };
  }
  function clipRectByRect(params, rect) {
    return echarts.graphic.clipRectByRect(rect, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    });
  }
  // -------------
  //  Enable Drag
  // -------------
  function onDragSwitchClick(model, api, type) {
    _draggable = !_draggable;
    myChart.setOption({
      dataZoom: [
        {
          id: 'insideX',
          disabled: _draggable,
        },
        {
          id: 'insideY',
          disabled: _draggable,
        },
      ],
    });
    this.model.setIconStatus(type, _draggable ? 'emphasis' : 'normal');
  }
  function initDrag() {
    console.log('lineINITDRAg');
    _autoDataZoomAnimator = makeAnimator(dispatchDataZoom);
    myChart.on('mousedown', function (param) {
      if (!_draggable || !param || param.seriesIndex == null) {
        return;
      }
      // Drag start
      _draggingRecord = {
        dataIndex: param.dataIndex,
        categoryIndex: param.value[DIM_CATEGORY_INDEX],
        timeArrival: param.value[DIM_TIME_ARRIVAL],
        timeDeparture: param.value[DIM_TIME_DEPARTURE],
      };
      var style = {
        lineWidth: 2,
        fill: 'rgba(255,0,0,0.1)',
        stroke: 'rgba(255,0,0,0.8)',
        lineDash: [6, 3],
      };
      _draggingEl = addOrUpdateBar(_draggingEl, _draggingRecord, style, 100);
      _draggingCursorOffset = [
        _draggingEl.position[0] - param.event.offsetX,
        _draggingEl.position[1] - param.event.offsetY,
      ];
      _draggingTimeLength = _draggingRecord.timeDeparture - _draggingRecord.timeArrival;
    });
    myChart.getZr().on('mousemove', function (event) {
      if (!_draggingEl) {
        return;
      }
      var cursorX = event.offsetX;
      var cursorY = event.offsetY;
      // Move _draggingEl.
      _draggingEl.attr('position', [
        _draggingCursorOffset[0] + cursorX,
        _draggingCursorOffset[1] + cursorY,
      ]);
      prepareDrop();
      autoDataZoomWhenDraggingOutside(cursorX, cursorY);
    });
    myChart.getZr().on('mouseup', function () {
      // Drop
      if (_draggingEl && _dropRecord) {
        updateRawData() &&
          myChart.setOption({
            series: {
              id: 'flightDataCenter',
              data: _rawData.flight.data,
            },
          });
      }
      dragRelease();
    });
    myChart.getZr().on('globalout', dragRelease);
    function dragRelease() {
      _autoDataZoomAnimator.stop();
      if (_draggingEl) {
        myChart.getZr().remove(_draggingEl);
        _draggingEl = null;
      }
      if (_dropShadow) {
        myChart.getZr().remove(_dropShadow);
        _dropShadow = null;
      }
      _dropRecord = _draggingRecord = null;
    }
    function addOrUpdateBar(el, itemData, style, z) {
      var pointArrival = myChart.convertToPixel('grid', [
        itemData.timeArrival,
        itemData.categoryIndex,
      ]);
      var pointDeparture = myChart.convertToPixel('grid', [
        itemData.timeDeparture,
        itemData.categoryIndex,
      ]);
      var barLength = pointDeparture[0] - pointArrival[0];
      var barHeight =
        Math.abs(
          myChart.convertToPixel('grid', [0, 0])[1] - myChart.convertToPixel('grid', [0, 1])[1],
        ) * HEIGHT_RATIO;
      if (!el) {
        el = new echarts.graphic.Rect({
          shape: { x: 0, y: 0, width: 0, height: 0 },
          style: style,
          z: z,
        });
        myChart.getZr().add(el);
      }
      el.attr({
        shape: { x: 0, y: 0, width: barLength, height: barHeight },
        position: [pointArrival[0], pointArrival[1] - barHeight],
      });
      return el;
    }
    function prepareDrop() {
      // Check droppable place.
      var xPixel = _draggingEl.shape.x + _draggingEl.position[0];
      var yPixel = _draggingEl.shape.y + _draggingEl.position[1];
      var cursorData = myChart.convertFromPixel('grid', [xPixel, yPixel]);
      if (cursorData) {
        // Make drop shadow and _dropRecord
        _dropRecord = {
          categoryIndex: Math.floor(cursorData[1]),
          timeArrival: cursorData[0],
          timeDeparture: cursorData[0] + _draggingTimeLength,
        };
        var style = { fill: 'rgba(0,0,0,0.4)' };
        _dropShadow = addOrUpdateBar(_dropShadow, _dropRecord, style, 99);
      }
    }
    // This is some business logic, don't care about it.
    function updateRawData() {
      var flightDataCenter = _rawData.flight.data;
      var movingItem = flightDataCenter[_draggingRecord.dataIndex];
      // Check conflict
      for (var i = 0; i < flightDataCenter.length; i++) {
        var dataItem = flightDataCenter[i];
        if (
          dataItem !== movingItem &&
          _dropRecord.categoryIndex === dataItem[DIM_CATEGORY_INDEX] &&
          _dropRecord.timeArrival < dataItem[DIM_TIME_DEPARTURE] &&
          _dropRecord.timeDeparture > dataItem[DIM_TIME_ARRIVAL]
        ) {
          alert('Conflict! Find a free space to settle the bar!');
          return;
        }
      }
      // No conflict.
      movingItem[DIM_CATEGORY_INDEX] = _dropRecord.categoryIndex;
      movingItem[DIM_TIME_ARRIVAL] = _dropRecord.timeArrival;
      movingItem[DIM_TIME_DEPARTURE] = _dropRecord.timeDeparture;
      return true;
    }
    function autoDataZoomWhenDraggingOutside(cursorX, cursorY) {
      // When cursor is outside the cartesian and being dragging,
      // auto move the dataZooms.
      var cursorDistX = getCursorCartesianDist(cursorX, _cartesianXBounds);
      var cursorDistY = getCursorCartesianDist(cursorY, _cartesianYBounds);
      if (cursorDistX !== 0 || cursorDistY !== 0) {
        _autoDataZoomAnimator.start({
          cursorDistX: cursorDistX,
          cursorDistY: cursorDistY,
        });
      } else {
        _autoDataZoomAnimator.stop();
      }
    }
    function dispatchDataZoom(params) {
      var option = myChart.getOption();
      var optionInsideX = option.dataZoom[DATA_ZOOM_X_INSIDE_INDEX];
      var optionInsideY = option.dataZoom[DATA_ZOOM_Y_INSIDE_INDEX];
      var batch = [];
      prepareBatch(batch, 'insideX', optionInsideX.start, optionInsideX.end, params.cursorDistX);
      prepareBatch(batch, 'insideY', optionInsideY.start, optionInsideY.end, -params.cursorDistY);
      batch.length &&
        myChart.dispatchAction({
          type: 'dataZoom',
          batch: batch,
        });
      function prepareBatch(batch, id, start, end, cursorDist) {
        if (cursorDist === 0) {
          return;
        }
        var sign = cursorDist / Math.abs(cursorDist);
        var size = end - start;
        var delta = DATA_ZOOM_AUTO_MOVE_SPEED * sign;
        start += delta;
        end += delta;
        if (end > 100) {
          end = 100;
          start = end - size;
        }
        if (start < 0) {
          start = 0;
          end = start + size;
        }
        batch.push({
          dataZoomId: id,
          start: start,
          end: end,
        });
      }
    }
    function getCursorCartesianDist(cursorXY, bounds) {
      var dist0 = cursorXY - (bounds[0] + DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
      var dist1 = cursorXY - (bounds[1] - DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
      return dist0 * dist1 <= 0
        ? 0 // cursor is in cartesian
        : dist0 < 0
        ? dist0 // cursor is at left/top of cartesian
        : dist1; // cursor is at right/bottom of cartesian
    }
    function makeAnimator(callback) {
      var requestId;
      var callbackParams;
      // Use throttle to prevent from calling dispatchAction frequently.
      callback = echarts.throttle(callback, DATA_ZOOM_AUTO_MOVE_THROTTLE);
      function onFrame() {
        callback(callbackParams);
        requestId = requestAnimationFrame(onFrame);
      }
      return {
        start: function (params) {
          callbackParams = params;
          if (requestId == null) {
            onFrame();
          }
        },
        stop: function () {
          if (requestId != null) {
            cancelAnimationFrame(requestId);
          }
          requestId = callbackParams = null;
        },
      };
    }
  }
  return (
    <div className="wrap">
      <Row>
        <Col span={8}>
          <LeftTop />
          <LeftCenter
            materialDemandList={allData.materialDemandList}
            leftEchart={leftEchart}
            leftEchartsPieInfoOne={leftEchartsPieInfoOne}
            leftEchartsPieInfoTwo={leftEchartsPieInfoTwo}
            leftEchartsPieInfoThree={leftEchartsPieInfoThree}
            leftEchartsPieInfoFour={leftEchartsPieInfoFour}
            leftEchartsPieOne={leftEchartsPieOne}
            leftEchartsPieTwo={leftEchartsPieTwo}
            leftEchartsPieThree={leftEchartsPieThree}
            leftEchartsPieFour={leftEchartsPieFour}
            outSideOrderDetail={outSideOrderDetail}
            outSideOrderDetailTimeList={outSideOrderDetailTimeList}
            outSideScheduleCycle={outSideScheduleCycle}
            outSideSchedulePattern={outSideSchedulePattern}
            scheduleTarget={scheduleTarget}
          />
          <LeftBottom
            allData={allData}
            finishPlanObj={finishPlanObj}
            diffAlgorithmX={diffAlgorithmX}
            bigValueLine={bigValueLine}
            diffAlgorithmY={diffAlgorithmY}
            materialTypeSixList={materialTypeSixList}
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
          <Gantt orderScheduleDetail={mockData.orderScheduleDetail ?? []} />
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
            rightEchartsDayOutputOne={rightEchartsDayOutputOne}
            rightEchartsStateRatioOne={rightEchartsStateRatioOne}
            rightEchartsStateRatioTwo={rightEchartsStateRatioTwo}
            rightEchartsDayOutputTwo={rightEchartsDayOutputTwo}
            rightEchartsStateRatioThree={rightEchartsStateRatioThree}
            rightEchartsDayOutputThree={rightEchartsDayOutputThree}
            rightEchartsStateRatioFour={rightEchartsStateRatioFour}
            rightEchartsDayOutputFour={rightEchartsDayOutputFour}
            rightEchartsStateRatioFive={rightEchartsStateRatioFive}
            rightEchartsDayOutputFive={rightEchartsDayOutputFive}
            infoOne={infoOne}
            infoTwo={infoTwo}
            infoThree={infoThree}
            infoFour={infoFour}
            infoFive={infoFive}
          />
          <RightBottom rightBottomInfor={rightBottomInfor} />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(Home);
