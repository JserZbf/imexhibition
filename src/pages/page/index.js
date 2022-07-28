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
        var chartDom = document.getElementById('main');
        myChart = echarts.init(chartDom);
        axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
          //console.log(rawData, 'rawData______________', ROOT_PATH);
          _rawData = rawData.data;
          setGanTeData(res.orderScheduleDetail);
          var cen1T = res.orderScheduleDetail.map((item, index) => {
            return {
              ...item,
              currentColor: color16(),
              yValue: index,
            };
          });
          const cen2 = res.orderScheduleDetail.map((item, index) => {
            return {
              ...item,
              currentColor: cen1T[index].currentColor,
              yValue: index,
            };
          });
          const cen3 = res.orderScheduleDetail.map((item, index) => {
            return {
              ...item,
              currentColor: cen1T[index].currentColor,
              yValue: index,
            };
          });
          const cen4 = res.orderScheduleDetail.map((item, index) => {
            return {
              ...item,
              currentColor: cen1T[index].currentColor,
              yValue: index,
            };
          });
          myChart.setOption((option = makeOption(cen1T, cen2, cen3, cen4)));
          initDrag();
        });
      }
    });
  }, [count]);
  // useEffect(() => {
  //   //  getAllData(obj).then((res) => {
  //   // console.log(res, 'res-last-dead');
  //   const res = {
  //     code: 200,
  //     deviceCardDetail: [
  //       {
  //         dayOutput: {
  //           X: ['20220723', '20220717'],
  //           Y: [14, 4],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '350-2',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.16742424242424242,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [901, 743, 1772, 92, 7693],
  //           Y2: [3057, 1524, 3583, 952, 0],
  //           Y3: [5282, 6973, 3885, 8196, 1547],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220722', '20220724', '20220723', '20220717', '20220718'],
  //           Y: [7, 5, 2, 1, 1],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '350-3',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.2093073593073593,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [398, 133, 663, 134, 7306],
  //           Y2: [2040, 929, 1126, 761, 0],
  //           Y3: [6802, 8178, 7451, 8345, 1934],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220717', '20220718'],
  //           Y: [6, 2],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '海科特-1',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.08073593073593073,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [148, 383, 1984, 2253, 8494],
  //           Y2: [2748, 2913, 3181, 3459, 0],
  //           Y3: [6344, 5944, 4075, 3528, 746],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220717'],
  //           Y: [2],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '6000-2',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.030303030303030304,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [1043, 1266, 354, 2450, 8960],
  //           Y2: [2411, 2939, 1238, 3028, 0],
  //           Y3: [5786, 5035, 7648, 3762, 280],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220718'],
  //           Y: [2],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '锡根',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.025974025974025976,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [526, 1561, 735, 279, 9000],
  //           Y2: [1787, 3725, 1143, 2183, 0],
  //           Y3: [6927, 3954, 7362, 6778, 240],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220722', '20220717', '20220718'],
  //           Y: [8, 2, 2],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '海科特-2',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.09253246753246754,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [163, 6, 59, 80, 8385],
  //           Y2: [3869, 776, 1409, 1823, 0],
  //           Y3: [5208, 8458, 7772, 7337, 855],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220719', '20220720', '20220717', '20220718'],
  //           Y: [11, 11, 7, 3],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '英赛',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.29805194805194807,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [781, 504, 322, 1883, 6486],
  //           Y2: [2095, 612, 1890, 2127, 0],
  //           Y3: [6364, 8124, 7028, 5230, 2754],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220721', '20220719', '20220718'],
  //           Y: [11, 5, 1],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '清洗机',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.15627705627705626,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [382, 224, 1689, 2204, 7796],
  //           Y2: [1185, 723, 3292, 2430, 0],
  //           Y3: [7673, 8293, 4259, 4606, 1444],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220717'],
  //           Y: [4],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '10000-1',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.06774891774891775,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [80, 988, 176, 351, 8614],
  //           Y2: [969, 1462, 4395, 2746, 0],
  //           Y3: [8191, 6790, 4669, 6143, 626],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220718', '20220717'],
  //           Y: [7, 6],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '依巴米亚',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.10844155844155844,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [522, 1040, 1401, 2849, 8238],
  //           Y2: [3862, 2956, 1518, 3105, 0],
  //           Y3: [4856, 5244, 6321, 3286, 1002],
  //         },
  //       },
  //       {
  //         dayOutput: {
  //           X: ['20220720', '20220718', '20220721', '20220717', '20220722'],
  //           Y: [5, 5, 3, 3, 1],
  //         },
  //         deviceImg: '1.png',
  //         deviceName: '试漏设备',
  //         isFinishMaintain: '否',
  //         runTimeRate: 0.18322510822510824,
  //         stateRatio: {
  //           X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //           Y1: [726, 706, 796, 1913, 7547],
  //           Y2: [1821, 1127, 3645, 2525, 0],
  //           Y3: [6693, 7407, 4799, 4802, 1693],
  //         },
  //       },
  //     ],
  //     deviceStatisticsInfo: {
  //       deviceUseStatistics: {
  //         ActualUsedNum: 11,
  //         availableNum: 22,
  //         useRate: 0.5,
  //       },
  //       deviceUseTime: '8:00-17:00,19:00-次日8:00',
  //       fourWeekEnergyConsumption: {
  //         X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //         Y1: [
  //           2340.9, 1643.8999999999999, 1439.05, 1314.95, 1227.3999999999999, 851.6999999999999,
  //           726.75, 634.1, 532.1, 238.0, 204.0,
  //         ],
  //         Y2: [
  //           1500.099999999999, 6210.099999999999, 6414.95, 6539.05, 6626.599999999999, 7002.3,
  //           7127.25, 7219.9, 7321.9, 7616.0, 3650.0,
  //         ],
  //       },
  //       fourWeekUseTrend: {
  //         X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //         Y1: [0.4, 0.6, 0.71, 0.68, 0.5],
  //         Y2: [0.8, 0.78, 0.85, 0.73, 0.29805194805194807],
  //         Y3: [0.4, 0.2, 0.13, 0.18, 0.025974025974025976],
  //       },
  //       fourWeekUtilizationRate: {
  //         X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //         Y1: [0.77, 0.85, 0.88, 0.79, 0.06454643841007478],
  //         Y2: [0.23, 0.15, 0.12, 0.21, 0.9354535615899252],
  //         Y3: [0.22, 0.2, 0.15, 0.16, 0.0],
  //       },
  //     },
  //     isHasMaintenance: false,
  //     materialDemandList: [
  //       {
  //         Specs: 'p1514',
  //         demandNum: 22,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 9,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'p3455',
  //         demandNum: 16,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 21,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'p2517',
  //         demandNum: 15,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'p1277',
  //         demandNum: 11,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tray',
  //         shortNum: 12,
  //         stockQuantity: 6,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'p3280',
  //         demandNum: 10,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'p1636',
  //         demandNum: 8,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tray',
  //         shortNum: 6,
  //         stockQuantity: 10,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'p3512',
  //         demandNum: 8,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'p1561',
  //         demandNum: 8,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 25,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'p3473',
  //         demandNum: 7,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 3,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'p2042',
  //         demandNum: 7,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tray',
  //         shortNum: 5,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'p1415',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'p1389',
  //         demandNum: 6,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tray',
  //         shortNum: 1,
  //         stockQuantity: 1,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'p3180',
  //         demandNum: 4,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tray',
  //         shortNum: 19,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'p2660',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 30,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'p1925',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 20,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'p1477',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 23,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'p1814',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'p1832',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 24,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'p3200',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'p1660',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tray',
  //         shortNum: 0,
  //         stockQuantity: 4,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'F1626',
  //         demandNum: 35,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 9,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'F1850',
  //         demandNum: 32,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 21,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'F1767',
  //         demandNum: 18,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'F3721',
  //         demandNum: 12,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'fixture',
  //         shortNum: 12,
  //         stockQuantity: 6,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'F3725',
  //         demandNum: 10,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'F1439',
  //         demandNum: 8,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'fixture',
  //         shortNum: 6,
  //         stockQuantity: 10,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'F2519',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'F1855',
  //         demandNum: 5,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 25,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'F1051',
  //         demandNum: 4,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 3,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'F3671',
  //         demandNum: 2,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'fixture',
  //         shortNum: 5,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'F1939',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'F2211',
  //         demandNum: 2,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'fixture',
  //         shortNum: 1,
  //         stockQuantity: 1,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'F3498',
  //         demandNum: 2,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'fixture',
  //         shortNum: 19,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'F2731',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 30,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'F3784',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 20,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'F2549',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'fixture',
  //         shortNum: 0,
  //         stockQuantity: 23,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D215铣刀45420',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 9,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'D160粗铣SNGX1205ANN',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 21,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D32立铣302175706',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'D6.8/10钻头302650516',
  //         demandNum: 1,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tool',
  //         shortNum: 12,
  //         stockQuantity: 6,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'D63铣刀LNGX130708',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D35精铰303161159',
  //         demandNum: 1,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tool',
  //         shortNum: 6,
  //         stockQuantity: 10,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'D100铣刀LNGX130708R',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'D15枪钻15.00*560',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 25,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'D63方肩铣LNGX130708',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 3,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'D92扩刀   ',
  //         demandNum: 6,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tool',
  //         shortNum: 5,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: 'D30铰刀302824237',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'D10立铣刀D10-180',
  //         demandNum: 6,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tool',
  //         shortNum: 1,
  //         stockQuantity: 1,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'D13钻头WP5H-D13.5-35-D16',
  //         demandNum: 6,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'tool',
  //         shortNum: 19,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'D30立铣刀D30-120-165',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 30,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: '45度倒角刀D30-50-120',
  //         demandNum: 7,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 23,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'D20枪钻D20.02*805',
  //         demandNum: 7,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'D171粗镗ccMt120408',
  //         demandNum: 7,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 24,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'D183粗镗ccMt120408',
  //         demandNum: 7,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D40.6镗刀+0.13',
  //         demandNum: 3,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 12,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'D152.7扩刀CNMG120408',
  //         demandNum: 3,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 28,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'D37铰刀303161160',
  //         demandNum: 3,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 12,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'D250精铣P45420',
  //         demandNum: 3,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 18,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'D63立铣LNGX130708R',
  //         demandNum: 3,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 23,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: '导管精刀0.006',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 18,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: '角度头EDCT10T308PDERLD',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 24,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'd14钻头',
  //         demandNum: 5,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 8,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'M14*2丝锥M14*2-D11*L140',
  //         demandNum: 5,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 18,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'd14.5扩刀',
  //         demandNum: 5,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 28,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'D60铰刀MPHX090304',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 30,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D10.5枪钻10.5*580',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 24,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'D17.5铰刀1274689',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 23,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: '密封环槽刀P45420',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 4,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: 'D40精镗+0.01',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 10,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: '103精镗刀0.015',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 9,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: '缸孔精镗刀',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 28,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'D16/17.5/钻头3y1071',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 22,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D12深孔钻6512-12',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'D12钻头302713010',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: 'D40精镗刀+0.115',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 26,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'D40方肩铣LNGX130708',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 19,
  //         supplyTime: '2022-07-14',
  //       },
  //       {
  //         Specs: 'D6.8/D9钻头26006429-3-3-MCD068',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 26,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'D100方肩铣LGX130708R',
  //         demandNum: 0,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'tool',
  //         shortNum: 0,
  //         stockQuantity: 19,
  //         supplyTime: '2022-07-16',
  //       },
  //       {
  //         Specs: 'P8H国六缸盖',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 9,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'WP3H机体',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 21,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'H2缸盖',
  //         demandNum: 5,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'P11H机体',
  //         demandNum: 18,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'blank',
  //         shortNum: 12,
  //         stockQuantity: 6,
  //         supplyTime: '2022-07-17',
  //       },
  //       {
  //         Specs: '12M33机体',
  //         demandNum: 10,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-15',
  //       },
  //       {
  //         Specs: '16M33总成',
  //         demandNum: 16,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'blank',
  //         shortNum: 6,
  //         stockQuantity: 10,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'H2缸盖吕框架',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-11',
  //       },
  //       {
  //         Specs: 'WP8机体',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 25,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'WP13H缸盖',
  //         demandNum: 1,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 3,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: '8M33机体',
  //         demandNum: 32,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'blank',
  //         shortNum: 5,
  //         stockQuantity: 27,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'P11机体',
  //         demandNum: 6,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 29,
  //         supplyTime: '2022-07-13',
  //       },
  //       {
  //         Specs: '46吨阀体',
  //         demandNum: 2,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'blank',
  //         shortNum: 1,
  //         stockQuantity: 1,
  //         supplyTime: '2022-07-19',
  //       },
  //       {
  //         Specs: 'P8H机体',
  //         demandNum: 35,
  //         isAdequate: '否',
  //         materialStatus: '待补充',
  //         materialType: 'blank',
  //         shortNum: 19,
  //         stockQuantity: 16,
  //         supplyTime: '2022-07-18',
  //       },
  //       {
  //         Specs: 'P8GH机体',
  //         demandNum: 2,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 30,
  //         supplyTime: '2022-07-12',
  //       },
  //       {
  //         Specs: 'P15NG机体',
  //         demandNum: 8,
  //         isAdequate: '是',
  //         materialStatus: '已到',
  //         materialType: 'blank',
  //         shortNum: 0,
  //         stockQuantity: 20,
  //         supplyTime: '2022-07-13',
  //       },
  //     ],
  //     message: 'scheduling success!',
  //     orderCardDetail: [
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5551200.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-16',
  //         planLevel: 0,
  //         planNO: '2022051021330739627200001',
  //         planStart: '2022-05-10',
  //         productName: '12M33机体',
  //         productNum: 2,
  //         schedualEnd: '2022-07-19 06:00:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 6107700.0,
  //         finishNum: 2,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330742024300002',
  //         planStart: '2022-05-10',
  //         productName: '8M33机体',
  //         productNum: 8,
  //         schedualEnd: '2022-07-21 16:35:00',
  //         schedualStart: '2022-07-19 06:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5778480.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330742123900003',
  //         planStart: '2022-05-10',
  //         productName: 'WP3H机体',
  //         productNum: 1,
  //         schedualEnd: '2022-07-17 21:08:00',
  //         schedualStart: '2022-07-17 19:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 6123720.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330742223800004',
  //         planStart: '2022-05-10',
  //         productName: 'P15NG机体',
  //         productNum: 2,
  //         schedualEnd: '2022-07-21 21:02:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5758680.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330742323800005',
  //         planStart: '2022-05-10',
  //         productName: 'P8H国六缸盖',
  //         productNum: 2,
  //         schedualEnd: '2022-07-17 15:38:00',
  //         schedualStart: '2022-07-17 12:10:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5971080.0,
  //         finishNum: 1,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330742423300006',
  //         planStart: '2022-05-10',
  //         productName: '16M33总成',
  //         productNum: 4,
  //         schedualEnd: '2022-07-20 02:38:00',
  //         schedualStart: '2022-07-17 11:52:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5746200.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330742523100007',
  //         planStart: '2022-05-10',
  //         productName: 'WP8机体',
  //         productNum: 2,
  //         schedualEnd: '2022-07-17 12:10:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5815560.0,
  //         finishNum: 1,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330742718700008',
  //         planStart: '2022-05-10',
  //         productName: 'P11机体',
  //         productNum: 6,
  //         schedualEnd: '2022-07-18 07:26:00',
  //         schedualStart: '2022-07-18 00:20:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5751420.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330742822500009',
  //         planStart: '2022-05-10',
  //         productName: 'WP13H缸盖',
  //         productNum: 1,
  //         schedualEnd: '2022-07-17 13:37:00',
  //         schedualStart: '2022-07-17 10:53:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5748000.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330742922000010',
  //         planStart: '2022-05-10',
  //         productName: '46吨阀体',
  //         productNum: 2,
  //         schedualEnd: '2022-07-17 12:40:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5821920.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330743021600011',
  //         planStart: '2022-05-10',
  //         productName: 'P8GH机体',
  //         productNum: 1,
  //         schedualEnd: '2022-07-18 09:12:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5761080.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 2,
  //         planNO: '2022051021330743121700012',
  //         planStart: '2022-05-10',
  //         productName: 'H2缸盖吕框架',
  //         productNum: 1,
  //         schedualEnd: '2022-07-17 16:18:00',
  //         schedualStart: '2022-07-17 13:37:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 6138480.0,
  //         finishNum: 0,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330743221200013',
  //         planStart: '2022-05-10',
  //         productName: 'H2缸盖',
  //         productNum: 1,
  //         schedualEnd: '2022-07-22 01:08:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 5797440.0,
  //         finishNum: 1,
  //         planEnd: '2022-05-12',
  //         planLevel: 0,
  //         planNO: '2022051021330743320800014',
  //         planStart: '2022-05-10',
  //         productName: 'P11H机体',
  //         productNum: 6,
  //         schedualEnd: '2022-07-18 02:24:00',
  //         schedualStart: '2022-07-17 08:00:00',
  //         state: '加工中',
  //       },
  //       {
  //         aheadMinutes: 0.0,
  //         delayMinutes: 6249600.0,
  //         finishNum: 1,
  //         planEnd: '2022-05-13',
  //         planLevel: 1,
  //         planNO: '2022051021330743420600015',
  //         planStart: '2022-05-10',
  //         productName: 'P8H机体',
  //         productNum: 7,
  //         schedualEnd: '2022-07-24 08:00:00',
  //         schedualStart: '2022-07-22 00:03:00',
  //         state: '加工中',
  //       },
  //     ],
  //     orderNO: '564687',
  //     orderScheduleDetail: [
  //       {
  //         endTime: '2022-07-17 10:53:00',
  //         fixture: 'F3228',
  //         machineName: '10000-1',
  //         opName: 'H2缸盖OP010',
  //         orderNO: '2022051021330743221200013',
  //         planNO: '2022051021330743221200013',
  //         productName: 'H2缸盖',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T20133#H200920',
  //         toolType: 'D60铰刀MPHX090304#D10.5枪钻10.5*580',
  //         tray: 'p1832',
  //         useTime: 173.0,
  //       },
  //       {
  //         endTime: '2022-07-17 10:50:00',
  //         fixture: 'F2211',
  //         machineName: '6000-2',
  //         opName: '46吨阀体OP020',
  //         orderNO: '2022051021330742922000010',
  //         planNO: '2022051021330742922000010',
  //         productName: '46吨阀体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'BF1056#AF4546',
  //         toolType: 'D40方肩铣LNGX130708#D6.8/D9钻头26006429-3-3-MCD068',
  //         tray: 'p1925',
  //         useTime: 170.0,
  //       },
  //       {
  //         endTime: '2022-07-17 09:52:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-2',
  //         opName: 'P15NG机体OP020',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H2203',
  //         toolType: '106.9扩刀CCMT120408',
  //         tray: 'p3180',
  //         useTime: 112.0,
  //       },
  //       {
  //         endTime: '2022-07-17 10:42:00',
  //         fixture: 'F3671',
  //         machineName: '350-3',
  //         opName: 'P8GH机体OP015',
  //         orderNO: '2022051021330743021600011',
  //         planNO: '2022051021330743021600011',
  //         productName: 'P8GH机体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'P8G61501',
  //         toolType: '103精镗刀0.015',
  //         tray: 'p1561',
  //         useTime: 162.0,
  //       },
  //       {
  //         endTime: '2022-07-17 10:35:00',
  //         fixture: 'F3498',
  //         machineName: '350-2',
  //         opName: 'WP8机体OP030',
  //         orderNO: '2022051021330742523100007',
  //         planNO: '2022051021330742523100007',
  //         productName: 'WP8机体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: '角度头',
  //         toolType: '角度头EDCT10T308PDERLD',
  //         tray: 'p1277',
  //         useTime: 155.0,
  //       },
  //       {
  //         endTime: '2022-07-17 10:07:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 127.0,
  //       },
  //       {
  //         endTime: '2022-07-17 10:26:00',
  //         fixture: 'F3725',
  //         machineName: '英赛',
  //         opName: '12M33机体OP020',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-17 08:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T151#T01006',
  //         toolType: 'D160粗铣SNGX1205ANN#D215铣刀45420',
  //         tray: 'p3280',
  //         useTime: 146.0,
  //       },
  //       {
  //         endTime: '2022-07-17 11:44:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-2',
  //         opName: 'P15NG机体OP020',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-17 09:52:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H2203',
  //         toolType: '106.9扩刀CCMT120408',
  //         tray: 'p3180',
  //         useTime: 112.0,
  //       },
  //       {
  //         endTime: '2022-07-17 11:14:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 10:07:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 67.0,
  //       },
  //       {
  //         endTime: '2022-07-17 11:52:00',
  //         fixture: 'F3725',
  //         machineName: '英赛',
  //         opName: '12M33机���OP020',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-17 10:26:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T151#T01006',
  //         toolType: 'D160粗铣SNGX1205ANN#D215铣刀45420',
  //         tray: 'p3280',
  //         useTime: 86.0,
  //       },
  //       {
  //         endTime: '2022-07-17 12:10:00',
  //         fixture: 'F3498',
  //         machineName: '350-2',
  //         opName: 'WP8机体OP030',
  //         orderNO: '2022051021330742523100007',
  //         planNO: '2022051021330742523100007',
  //         productName: 'WP8机体',
  //         startTime: '2022-07-17 10:35:00',
  //         staticTime: '20220717',
  //         toolMachineName: '角度头',
  //         toolType: '角度头EDCT10T308PDERLD',
  //         tray: 'p1277',
  //         useTime: 95.0,
  //       },
  //       {
  //         endTime: '2022-07-17 12:40:00',
  //         fixture: 'F2211',
  //         machineName: '6000-2',
  //         opName: '46吨阀体OP020',
  //         orderNO: '2022051021330742922000010',
  //         planNO: '2022051021330742922000010',
  //         productName: '46吨阀体',
  //         startTime: '2022-07-17 10:50:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'BF1056#AF4546',
  //         toolType: 'D40方肩铣LNGX130708#D6.8/D9钻头26006429-3-3-MCD068',
  //         tray: 'p1925',
  //         useTime: 110.0,
  //       },
  //       {
  //         endTime: '2022-07-17 13:37:00',
  //         fixture: 'F3784',
  //         machineName: '10000-1',
  //         opName: 'WP13H缸盖OP040',
  //         orderNO: '2022051021330742822500009',
  //         planNO: '2022051021330742822500009',
  //         productName: 'WP13H缸盖',
  //         startTime: '2022-07-17 10:53:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T3403',
  //         toolType: 'D100方肩铣LGX130708R',
  //         tray: 'p1832',
  //         useTime: 164.0,
  //       },
  //       {
  //         endTime: '2022-07-17 12:21:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 11:14:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 67.0,
  //       },
  //       {
  //         endTime: '2022-07-17 14:16:00',
  //         fixture: 'F3228',
  //         machineName: '依巴米亚',
  //         opName: 'H2缸盖OP030',
  //         orderNO: '2022051021330743221200013',
  //         planNO: '2022051021330743221200013',
  //         productName: 'H2缸盖',
  //         startTime: '2022-07-17 11:52:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'P12005',
  //         toolType: 'D17.5铰刀1274689',
  //         tray: 'p2042',
  //         useTime: 144.0,
  //       },
  //       {
  //         endTime: '2022-07-17 13:55:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP010',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 11:52:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T163328',
  //         toolType: 'D40.6镗刀+0.13',
  //         tray: 'p3280',
  //         useTime: 123.0,
  //       },
  //       {
  //         endTime: '2022-07-17 14:09:00',
  //         fixture: 'F1939',
  //         machineName: '350-2',
  //         opName: 'P8H国六缸盖OP030',
  //         orderNO: '2022051021330742323800005',
  //         planNO: '2022051021330742323800005',
  //         productName: 'P8H国六缸盖',
  //         startTime: '2022-07-17 12:10:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H6总成3003',
  //         toolType: '导管精刀0.006',
  //         tray: 'p1277',
  //         useTime: 119.0,
  //       },
  //       {
  //         endTime: '2022-07-17 13:28:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 12:21:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 67.0,
  //       },
  //       {
  //         endTime: '2022-07-17 14:35:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 13:28:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 67.0,
  //       },
  //       {
  //         endTime: '2022-07-17 16:18:00',
  //         fixture: 'F2549',
  //         machineName: '10000-1',
  //         opName: 'H2缸盖吕框架OP030',
  //         orderNO: '2022051021330743121700012',
  //         planNO: '2022051021330743121700012',
  //         productName: 'H2缸盖吕框架',
  //         startTime: '2022-07-17 13:37:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H11004',
  //         toolType: 'D40精镗+0.01',
  //         tray: 'p3200',
  //         useTime: 161.0,
  //       },
  //       {
  //         endTime: '2022-07-17 14:58:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP010',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 13:55:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T163328',
  //         toolType: 'D40.6镗刀+0.13',
  //         tray: 'p3280',
  //         useTime: 63.0,
  //       },
  //       {
  //         endTime: '2022-07-17 15:38:00',
  //         fixture: 'F1939',
  //         machineName: '350-2',
  //         opName: 'P8H国六缸盖OP030',
  //         orderNO: '2022051021330742323800005',
  //         planNO: '2022051021330742323800005',
  //         productName: 'P8H国六缸盖',
  //         startTime: '2022-07-17 14:09:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H6总成3003',
  //         toolType: '导管精刀0.006',
  //         tray: 'p1277',
  //         useTime: 89.0,
  //       },
  //       {
  //         endTime: '2022-07-17 16:08:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 14:16:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 112.0,
  //       },
  //       {
  //         endTime: '2022-07-17 15:42:00',
  //         fixture: 'F1767',
  //         machineName: '海科特-1',
  //         opName: 'P11H机体OP020',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 14:35:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H39039#H39043',
  //         toolType: 'D134.5镗刀CCMT120408#D163.5镗刀CCMT120408',
  //         tray: 'p1389',
  //         useTime: 67.0,
  //       },
  //       {
  //         endTime: '2022-07-17 16:01:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP010',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 14:58:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T163328',
  //         toolType: 'D40.6镗刀+0.13',
  //         tray: 'p3280',
  //         useTime: 63.0,
  //       },
  //       {
  //         endTime: '2022-07-17 20:03:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP010',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 19:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T163328',
  //         toolType: 'D40.6镗刀+0.13',
  //         tray: 'p3280',
  //         useTime: 63.0,
  //       },
  //       {
  //         endTime: '2022-07-17 20:52:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 19:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 112.0,
  //       },
  //       {
  //         endTime: '2022-07-17 20:39:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 19:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 99.0,
  //       },
  //       {
  //         endTime: '2022-07-17 21:08:00',
  //         fixture: 'F2731',
  //         machineName: '10000-1',
  //         opName: 'WP3H机体OP010',
  //         orderNO: '2022051021330742123900003',
  //         planNO: '2022051021330742123900003',
  //         productName: 'WP3H机体',
  //         startTime: '2022-07-17 19:00:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T31003',
  //         toolType: 'D30立铣刀D30-120-165',
  //         tray: 'p3200',
  //         useTime: 128.0,
  //       },
  //       {
  //         endTime: '2022-07-17 22:42:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP020',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 20:03:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'T061006#T081102',
  //         toolType: 'D152.7扩刀CNMG120408#D37铰刀303161160',
  //         tray: 'p3280',
  //         useTime: 159.0,
  //       },
  //       {
  //         endTime: '2022-07-17 21:48:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 20:39:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 69.0,
  //       },
  //       {
  //         endTime: '2022-07-17 21:44:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 20:52:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 52.0,
  //       },
  //       {
  //         endTime: '2022-07-17 22:36:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 21:44:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 52.0,
  //       },
  //       {
  //         endTime: '2022-07-17 22:57:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 21:48:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 69.0,
  //       },
  //       {
  //         endTime: '2022-07-17 23:28:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 22:36:00',
  //         staticTime: '20220717',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 52.0,
  //       },
  //       {
  //         endTime: '2022-07-18 01:51:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP020',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-17 22:42:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'T061006#T081102',
  //         toolType: 'D152.7扩刀CNMG120408#D37铰刀303161160',
  //         tray: 'p1514',
  //         useTime: 189.0,
  //       },
  //       {
  //         endTime: '2022-07-18 00:06:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 22:57:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 69.0,
  //       },
  //       {
  //         endTime: '2022-07-18 00:20:00',
  //         fixture: 'F1767',
  //         machineName: '依巴米亚',
  //         opName: 'P11H机体OP040',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-17 23:28:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H34001#H34002#H39020',
  //         toolType: 'd14.5扩刀#d14钻头#M14*2丝锥M14*2-D11*L140',
  //         tray: 'p1415',
  //         useTime: 52.0,
  //       },
  //       {
  //         endTime: '2022-07-18 01:15:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-18 00:06:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 69.0,
  //       },
  //       {
  //         endTime: '2022-07-18 02:11:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 00:20:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 111.0,
  //       },
  //       {
  //         endTime: '2022-07-18 02:11:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-2',
  //         opName: 'P15NG机体OP030',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-18 00:20:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H2404',
  //         toolType: 'D16/17.5/钻头3y1071',
  //         tray: 'p3180',
  //         useTime: 111.0,
  //       },
  //       {
  //         endTime: '2022-07-18 02:24:00',
  //         fixture: 'F1767',
  //         machineName: '试漏设备',
  //         opName: 'P11H机体OP025',
  //         orderNO: '2022051021330743320800014',
  //         planNO: '2022051021330743320800014',
  //         productName: 'P11H机体',
  //         startTime: '2022-07-18 01:15:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 69.0,
  //       },
  //       {
  //         endTime: '2022-07-18 04:00:00',
  //         fixture: 'F1051',
  //         machineName: '英赛',
  //         opName: '16M33总成OP020',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-18 01:51:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'T061006#T081102',
  //         toolType: 'D152.7扩刀CNMG120408#D37铰刀303161160',
  //         tray: 'p1514',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-18 04:02:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-2',
  //         opName: 'P15NG机体OP030',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-18 02:11:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H2404',
  //         toolType: 'D16/17.5/钻头3y1071',
  //         tray: 'p3180',
  //         useTime: 111.0,
  //       },
  //       {
  //         endTime: '2022-07-18 04:02:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 02:11:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 111.0,
  //       },
  //       {
  //         endTime: '2022-07-18 07:09:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP020',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-18 04:00:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'T061006#T081102',
  //         toolType: 'D152.7扩刀CNMG120408#D37铰刀303161160',
  //         tray: 'p3280',
  //         useTime: 189.0,
  //       },
  //       {
  //         endTime: '2022-07-18 04:53:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 04:02:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 51.0,
  //       },
  //       {
  //         endTime: '2022-07-18 06:39:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-1',
  //         opName: 'P15NG机体OP050',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-18 04:02:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H51011#H51012#P171001',
  //         toolType: 'D40精镗刀+0.115#D12深孔钻6512-12#D12钻头302713010',
  //         tray: 'p2660',
  //         useTime: 157.0,
  //       },
  //       {
  //         endTime: '2022-07-18 05:44:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 04:53:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 51.0,
  //       },
  //       {
  //         endTime: '2022-07-18 06:35:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 05:44:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 51.0,
  //       },
  //       {
  //         endTime: '2022-07-18 07:26:00',
  //         fixture: 'F1318',
  //         machineName: '依巴米亚',
  //         opName: 'P11机体OP040',
  //         orderNO: '2022051021330742718700008',
  //         planNO: '2022051021330742718700008',
  //         productName: 'P11机体',
  //         startTime: '2022-07-18 06:35:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H554009',
  //         toolType: 'D120玉米铣LNMT1306PNTR',
  //         tray: 'p2042',
  //         useTime: 51.0,
  //       },
  //       {
  //         endTime: '2022-07-18 08:46:00',
  //         fixture: 'F3097',
  //         machineName: '海科特-1',
  //         opName: 'P15NG机体OP050',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-18 06:39:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'H51011#H51012#P171001',
  //         toolType: 'D40精镗刀+0.115#D12深孔钻6512-12#D12钻头302713010',
  //         tray: 'p2660',
  //         useTime: 127.0,
  //       },
  //       {
  //         endTime: '2022-07-18 09:12:00',
  //         fixture: 'F3671',
  //         machineName: '350-3',
  //         opName: 'P8GH机体总成025',
  //         orderNO: '2022051021330743021600011',
  //         planNO: '2022051021330743021600011',
  //         productName: 'P8GH机体',
  //         startTime: '2022-07-18 07:09:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'P8总成1506',
  //         toolType: '缸孔精镗刀',
  //         tray: 'p3512',
  //         useTime: 123.0,
  //       },
  //       {
  //         endTime: '2022-07-18 11:12:00',
  //         fixture: 'F3725',
  //         machineName: '锡根',
  //         opName: '12M33机体OP050',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 09:12:00',
  //         staticTime: '20220718',
  //         toolMachineName: '411#311#407',
  //         toolType: 'D6.8/10钻头302650516#D32立铣302175706',
  //         tray: 'p3437',
  //         useTime: 120.0,
  //       },
  //       {
  //         endTime: '2022-07-18 13:12:00',
  //         fixture: 'F1118',
  //         machineName: '锡根',
  //         opName: '12M33机体OP050',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 11:12:00',
  //         staticTime: '20220718',
  //         toolMachineName: '411#311#407',
  //         toolType: 'D6.8/10钻头302650516#D32立铣302175706',
  //         tray: 'p1814',
  //         useTime: 120.0,
  //       },
  //       {
  //         endTime: '2022-07-18 15:48:00',
  //         fixture: 'F1118',
  //         machineName: '试漏设备',
  //         opName: '12M33机体OP060',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 13:12:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 156.0,
  //       },
  //       {
  //         endTime: '2022-07-18 21:06:00',
  //         fixture: 'F1118',
  //         machineName: '试漏设备',
  //         opName: '12M33机体OP060',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 19:00:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 126.0,
  //       },
  //       {
  //         endTime: '2022-07-18 23:24:00',
  //         fixture: 'F1118',
  //         machineName: '清洗机',
  //         opName: '12M33机体OP070',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 21:06:00',
  //         staticTime: '20220718',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p1477',
  //         useTime: 138.0,
  //       },
  //       {
  //         endTime: '2022-07-19 01:12:00',
  //         fixture: 'F1118',
  //         machineName: '清洗机',
  //         opName: '12M33机体OP070',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-18 23:24:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p1477',
  //         useTime: 108.0,
  //       },
  //       {
  //         endTime: '2022-07-19 03:51:00',
  //         fixture: 'F1118',
  //         machineName: '英赛',
  //         opName: '12M33机体OP080',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-19 01:12:00',
  //         staticTime: '20220719',
  //         toolMachineName: '  T081101 #T015#T089',
  //         toolType: 'D63铣刀LNGX130708#D35精铰303161159#D100铣刀LNGX130708R',
  //         tray: 'p3280',
  //         useTime: 159.0,
  //       },
  //       {
  //         endTime: '2022-07-19 06:00:00',
  //         fixture: 'F1118',
  //         machineName: '英赛',
  //         opName: '12M33机体OP080',
  //         orderNO: '2022051021330739627200001',
  //         planNO: '2022051021330739627200001',
  //         productName: '12M33机体',
  //         startTime: '2022-07-19 03:51:00',
  //         staticTime: '20220719',
  //         toolMachineName: '  T081101 #T015#T089',
  //         toolType: 'D63铣刀LNGX130708#D35精铰303161159#D100铣刀LNGX130708R',
  //         tray: 'p3280',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-19 07:50:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 06:00:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 110.0,
  //       },
  //       {
  //         endTime: '2022-07-19 08:40:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 07:50:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 09:30:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 08:40:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 10:20:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 09:30:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 11:10:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 10:20:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 12:00:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 11:10:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 12:50:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 12:00:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 13:40:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP010',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-19 12:50:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T160330#T20331002',
  //         toolType: 'D20枪钻D20.02*805#45度倒角刀D30-50-120',
  //         tray: 'p1514',
  //         useTime: 50.0,
  //       },
  //       {
  //         endTime: '2022-07-19 15:29:00',
  //         fixture: 'F1051',
  //         machineName: '清洗机',
  //         opName: '16M33总成OP025',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 13:40:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-19 16:18:00',
  //         fixture: 'F1051',
  //         machineName: '清洗机',
  //         opName: '16M33总成OP025',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 15:29:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 49.0,
  //       },
  //       {
  //         endTime: '2022-07-19 19:49:00',
  //         fixture: 'F1051',
  //         machineName: '清洗机',
  //         opName: '16M33总成OP025',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 19:00:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 49.0,
  //       },
  //       {
  //         endTime: '2022-07-19 20:38:00',
  //         fixture: 'F1051',
  //         machineName: '清洗机',
  //         opName: '16M33总成OP025',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 19:49:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 49.0,
  //       },
  //       {
  //         endTime: '2022-07-19 22:53:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP030',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 20:38:00',
  //         staticTime: '20220719',
  //         toolMachineName: 'T123010#T021',
  //         toolType: 'D63立铣LNGX130708R#D250精铣P45420',
  //         tray: 'p3280',
  //         useTime: 135.0,
  //       },
  //       {
  //         endTime: '2022-07-20 00:08:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP030',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-19 22:53:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'T123010#T021',
  //         toolType: 'D63立铣LNGX130708R#D250精铣P45420',
  //         tray: 'p3280',
  //         useTime: 75.0,
  //       },
  //       {
  //         endTime: '2022-07-20 01:23:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP030',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-20 00:08:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'T123010#T021',
  //         toolType: 'D63立铣LNGX130708R#D250精铣P45420',
  //         tray: 'p3280',
  //         useTime: 75.0,
  //       },
  //       {
  //         endTime: '2022-07-20 02:38:00',
  //         fixture: 'F3721',
  //         machineName: '英赛',
  //         opName: '16M33总成OP030',
  //         orderNO: '2022051021330742423300006',
  //         planNO: '2022051021330742423300006',
  //         productName: '16M33总成',
  //         startTime: '2022-07-20 01:23:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'T123010#T021',
  //         toolType: 'D63立铣LNGX130708R#D250精铣P45420',
  //         tray: 'p3280',
  //         useTime: 75.0,
  //       },
  //       {
  //         endTime: '2022-07-20 04:25:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 02:38:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 107.0,
  //       },
  //       {
  //         endTime: '2022-07-20 05:12:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 04:25:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 05:59:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 05:12:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 06:46:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 05:59:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 07:33:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 06:46:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 08:20:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 07:33:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 09:07:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 08:20:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 09:54:00',
  //         fixture: 'F2430',
  //         machineName: '英赛',
  //         opName: '8M33机体OP020',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 09:07:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'M204005#M204002',
  //         toolType: 'D171粗镗ccMt120408#D183粗镗ccMt120408',
  //         tray: 'p1514',
  //         useTime: 47.0,
  //       },
  //       {
  //         endTime: '2022-07-20 12:13:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 09:54:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 139.0,
  //       },
  //       {
  //         endTime: '2022-07-20 14:02:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 12:13:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-20 15:51:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 14:02:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-20 20:49:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 19:00:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-20 22:38:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 20:49:00',
  //         staticTime: '20220720',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-21 00:27:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-20 22:38:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-21 02:16:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 00:27:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-21 04:05:00',
  //         fixture: 'F2430',
  //         machineName: '试漏设备',
  //         opName: '8M33机体OP030',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 02:16:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p3455',
  //         useTime: 109.0,
  //       },
  //       {
  //         endTime: '2022-07-21 06:05:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 04:05:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 120.0,
  //       },
  //       {
  //         endTime: '2022-07-21 07:35:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 06:05:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 09:05:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 07:35:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 10:35:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 09:05:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 12:05:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 10:35:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 13:35:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 12:05:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 15:05:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 13:35:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 16:35:00',
  //         fixture: 'F2430',
  //         machineName: '清洗机',
  //         opName: '8M33机体OP050',
  //         orderNO: '2022051021330742024300002',
  //         planNO: '2022051021330742024300002',
  //         productName: '8M33机体',
  //         startTime: '2022-07-21 15:05:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 90.0,
  //       },
  //       {
  //         endTime: '2022-07-21 20:16:00',
  //         fixture: 'F3097',
  //         machineName: '清洗机',
  //         opName: 'P15NG机体OP100',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-21 19:00:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 76.0,
  //       },
  //       {
  //         endTime: '2022-07-21 21:02:00',
  //         fixture: 'F3097',
  //         machineName: '清洗机',
  //         opName: 'P15NG机体OP100',
  //         orderNO: '2022051021330742223800004',
  //         planNO: '2022051021330742223800004',
  //         productName: 'P15NG机体',
  //         startTime: '2022-07-21 20:16:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 46.0,
  //       },
  //       {
  //         endTime: '2022-07-21 22:12:00',
  //         fixture: 'F3228',
  //         machineName: '清洗机',
  //         opName: 'H2缸盖OP040',
  //         orderNO: '2022051021330743221200013',
  //         planNO: '2022051021330743221200013',
  //         productName: 'H2缸盖',
  //         startTime: '2022-07-21 21:02:00',
  //         staticTime: '20220721',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p2517',
  //         useTime: 70.0,
  //       },
  //       {
  //         endTime: '2022-07-22 00:03:00',
  //         fixture: 'F3228',
  //         machineName: '海科特-2',
  //         opName: 'H2缸盖OP060',
  //         orderNO: '2022051021330743221200013',
  //         planNO: '2022051021330743221200013',
  //         productName: 'H2缸盖',
  //         startTime: '2022-07-21 22:12:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'H20351',
  //         toolType: '密封环槽刀P45420',
  //         tray: 'p1636',
  //         useTime: 111.0,
  //       },
  //       {
  //         endTime: '2022-07-22 01:37:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 00:03:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 94.0,
  //       },
  //       {
  //         endTime: '2022-07-22 01:08:00',
  //         fixture: 'F3228',
  //         machineName: '试漏设备',
  //         opName: 'H2缸盖OP150',
  //         orderNO: '2022051021330743221200013',
  //         planNO: '2022051021330743221200013',
  //         productName: 'H2缸盖',
  //         startTime: '2022-07-22 00:03:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'nan',
  //         toolType: '',
  //         tray: 'p1660',
  //         useTime: 65.0,
  //       },
  //       {
  //         endTime: '2022-07-22 02:11:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 01:37:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 02:45:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 02:11:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 03:19:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 02:45:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 03:53:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 03:19:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 04:27:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 03:53:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 05:01:00',
  //         fixture: 'F2255',
  //         machineName: '海科特-2',
  //         opName: 'P8H机体OP010',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 04:27:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P811',
  //         toolType: 'D15枪钻15.00*560',
  //         tray: 'p1636',
  //         useTime: 34.0,
  //       },
  //       {
  //         endTime: '2022-07-22 07:40:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 05:01:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 159.0,
  //       },
  //       {
  //         endTime: '2022-07-22 09:49:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 07:40:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-22 11:58:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 09:49:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-22 14:07:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 11:58:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-22 16:16:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 14:07:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-22 21:09:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 19:00:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-22 23:18:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体OP025',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 21:09:00',
  //         staticTime: '20220722',
  //         toolMachineName: 'P82539#P8总成1510',
  //         toolType: 'D92扩刀   #D63方肩铣LNGX130708',
  //         tray: 'p3512',
  //         useTime: 129.0,
  //       },
  //       {
  //         endTime: '2022-07-23 01:11:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-22 23:18:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 113.0,
  //       },
  //       {
  //         endTime: '2022-07-23 02:34:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 01:11:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 03:57:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 02:34:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 05:20:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 03:57:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 06:43:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 05:20:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 08:06:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 06:43:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 09:29:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP030',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 08:06:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63012',
  //         toolType: 'D30铰刀302824237',
  //         tray: 'p1277',
  //         useTime: 83.0,
  //       },
  //       {
  //         endTime: '2022-07-23 11:03:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 09:29:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 94.0,
  //       },
  //       {
  //         endTime: '2022-07-23 12:07:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 11:03:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 13:11:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 12:07:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 14:15:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 13:11:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 15:19:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 14:15:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 16:23:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 15:19:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 20:04:00',
  //         fixture: 'F2255',
  //         machineName: '350-2',
  //         opName: 'P8H机体OP035',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 19:00:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'G63506',
  //         toolType: 'D10立铣刀D10-180',
  //         tray: 'p3473',
  //         useTime: 64.0,
  //       },
  //       {
  //         endTime: '2022-07-23 22:12:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 20:04:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 128.0,
  //       },
  //       {
  //         endTime: '2022-07-23 23:50:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 22:12:00',
  //         staticTime: '20220723',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //       {
  //         endTime: '2022-07-24 01:28:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-23 23:50:00',
  //         staticTime: '20220724',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //       {
  //         endTime: '2022-07-24 03:06:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-24 01:28:00',
  //         staticTime: '20220724',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //       {
  //         endTime: '2022-07-24 04:44:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-24 03:06:00',
  //         staticTime: '20220724',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //       {
  //         endTime: '2022-07-24 06:22:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-24 04:44:00',
  //         staticTime: '20220724',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //       {
  //         endTime: '2022-07-24 08:00:00',
  //         fixture: 'F2255',
  //         machineName: '350-3',
  //         opName: 'P8H机体总成015',
  //         orderNO: '2022051021330743420600015',
  //         planNO: '2022051021330743420600015',
  //         productName: 'P8H机体',
  //         startTime: '2022-07-24 06:22:00',
  //         staticTime: '20220724',
  //         toolMachineName: 'P8总成1508',
  //         toolType: 'D13钻头WP5H-D13.5-35-D16',
  //         tray: 'p1561',
  //         useTime: 98.0,
  //       },
  //     ],
  //     orderStatisticsInfo: {
  //       algorithmComparisonData: {
  //         X: ['SPT', 'LPT', 'CR', 'EDD', 'ESD', 'PL'],
  //         Y: [
  //           -0.007452613424761111, -0.006216149984798692, -0.007363873947001564,
  //           -0.006279264842106959, -0.0068665867184703735, -0.006915024917600856,
  //         ],
  //       },
  //       fourWeekFinishRate: {
  //         X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //         Y: [0.95, 0.92, 0.92, 0.99, 0.0],
  //       },
  //       fourWeekOutputStatistics: {
  //         X: ['第一周', '第二周', '第三周', '第四周', '第五周'],
  //         Y1: [60.0, 40.0, 70.0, 50.0, 0.0],
  //         Y2: [30.0, 55.0, 80.0, 70.0, 46.0],
  //       },
  //       orderFinishStatistics: {
  //         aheadNum: 0,
  //         delayNum: 15,
  //         deliveryNum: 15,
  //         finishRate: 1.0,
  //       },
  //     },
  //     scheduleCycle: 9240.0,
  //     schedulePattern: 2,
  //     scheduleTarget: 1,
  //     selectAlgorithm: 1,
  //   };
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
  //   var chartDom = document.getElementById('main');
  //   myChart = echarts.init(chartDom);
  //   axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
  //     //console.log(rawData, 'rawData______________', ROOT_PATH);
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
  //     myChart.setOption((option = makeOption(cen1T, cen2, cen3, cen4)));
  //     initDrag();
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
      toolbox: {
        //左侧编辑
        show: false,
        left: 20,
        top: 0,
        itemSize: 20,
        feature: {
          myDrag: {
            show: true,
            title: 'Make bars\ndraggable',
            icon: 'pafth://M990.55 380.08 q11.69 0 19.88 8.19 q7.02 7.01 7.02 18.71 l0 480.65 q-1.17 43.27 -29.83 71.93 q-28.65 28.65 -71.92 29.82 l-813.96 0 q-43.27 -1.17 -72.5 -30.41 q-28.07 -28.07 -29.24 -71.34 l0 -785.89 q1.17 -43.27 29.24 -72.5 q29.23 -29.24 72.5 -29.24 l522.76 0 q11.7 0 18.71 7.02 q8.19 8.18 8.19 18.71 q0 11.69 -7.6 19.29 q-7.6 7.61 -19.3 7.61 l-518.08 0 q-22.22 1.17 -37.42 16.37 q-15.2 15.2 -15.2 37.42 l0 775.37 q0 23.39 15.2 38.59 q15.2 15.2 37.42 15.2 l804.6 0 q22.22 0 37.43 -15.2 q15.2 -15.2 16.37 -38.59 l0 -474.81 q0 -11.7 7.02 -18.71 q8.18 -8.19 18.71 -8.19 l0 0 ZM493.52 723.91 l-170.74 -170.75 l509.89 -509.89 q23.39 -23.39 56.13 -21.05 q32.75 1.17 59.65 26.9 l47.94 47.95 q25.73 26.89 27.49 59.64 q1.75 32.75 -21.64 57.3 l-508.72 509.9 l0 0 ZM870.09 80.69 l-56.13 56.14 l94.72 95.9 l56.14 -57.31 q8.19 -9.35 8.19 -21.05 q-1.17 -12.86 -10.53 -22.22 l-47.95 -49.12 q-10.52 -9.35 -23.39 -9.35 q-11.69 -1.17 -21.05 7.01 l0 0 ZM867.75 272.49 l-93.56 -95.9 l-380.08 380.08 l94.73 94.73 l378.91 -378.91 l0 0 ZM322.78 553.16 l38.59 39.77 l-33.92 125.13 l125.14 -33.92 l38.59 38.6 l-191.79 52.62 q-5.85 1.17 -12.28 0 q-6.44 -1.17 -11.11 -5.84 q-4.68 -4.68 -5.85 -11.7 q-2.34 -5.85 0 -11.69 l52.63 -192.97 l0 0 Z',
            onclick: onDragSwitchClick,
          },
        },
      },
      title: {
        show: false,
        text: 'Gantt of Airport Flight',
        left: 'center',
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'weakFilter',
          height: 20,
          bottom: 0,
          start: 0,
          end: 26,
          handleIcon:
            'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          showDetail: false,
        },
        {
          type: 'inside',
          id: 'insideX',
          xAxisIndex: 0,
          filterMode: 'weakFilter',
          start: 0,
          end: 26,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
        },
        {
          type: 'slider',
          yAxisIndex: 0,
          zoomLock: true,
          width: 10,
          right: 10,
          top: 70,
          bottom: 20,
          start: 92,
          end: 100,
          handleSize: 0,
          showDetail: false,
          show: true,
        },
        {
          type: 'inside',
          id: 'insideY',
          yAxisIndex: 0,
          start: 95,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
        },
      ],
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
          <div id="main"></div>
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
