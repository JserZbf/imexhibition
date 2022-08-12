import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Steps, Popover, Table, Tooltip } from 'antd';
const { Step } = Steps;
import './index.less';
import ReactEchartsCom from '../../components/ReactEcharts/index';
// 添加请求拦截器
import axios from 'axios';
import * as echarts from 'echarts';
import { autoToolTip } from '../../services/echarts_auto_tooltop';
import { RollbackOutlined } from '@ant-design/icons';
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
const leftCenter = function (props) {
  ///甘特图变量
  var ROOT_PATH = 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
  // var chartDom = document.getElementById('main-plan');
  // var myChartPlan = echarts.init(chartDom);
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
  var myChartPlan;
  var orderDetail = [
    {
      planNO: '2022051021330739627200001',
      productName: '12M33机体',
      productNum: 2,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-16',
    },
    {
      planNO: '2022051021330742024300002',
      productName: '8M33机体',
      productNum: 8,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742123900003',
      productName: 'WP3H机体',
      productNum: 1,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742223800004',
      productName: 'P15NG机体',
      productNum: 2,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742323800005',
      productName: 'P8H国六缸盖',
      productNum: 2,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742423300006',
      productName: '16M33总成',
      productNum: 4,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742523100007',
      productName: 'WP8机体',
      productNum: 2,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742718700008',
      productName: 'P11机体',
      productNum: 6,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742822500009',
      productName: 'WP13H缸盖',
      productNum: 1,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330742922000010',
      productName: '46吨阀体',
      productNum: 2,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330743021600011',
      productName: 'P8GH机体',
      productNum: 1,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330743121700012',
      productName: 'H2缸盖吕框架',
      productNum: 1,
      planType: '产品加工',
      planLevel: 2,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330743221200013',
      productName: 'H2缸盖',
      productNum: 1,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330743320800014',
      productName: 'P11H机体',
      productNum: 6,
      planType: '产品加工',
      planLevel: 0,
      planStart: '2022-05-10',
      planEnd: '2022-05-12',
    },
    {
      planNO: '2022051021330743420600015',
      productName: 'P8H机体',
      productNum: 7,
      planType: '产品加工',
      planLevel: 1,
      planStart: '2022-05-10',
      planEnd: '2022-05-13',
    },
  ];
  var dimensionsList = ['订单编号', '计划开始时间', '计划结束时间'];
  const {
    materialDemandList,
    leftEchart,
    outSideOrderDetail,
    outSideOrderDetailTimeList,
    currentTime,
  } = props;
  const [timer, setTimer] = useState(null);
  const [num, setNum] = useState(0);
  const [timers, setTimers] = useState(null);
  const mainPlan = useRef(null);
  const [inSideOrderDetailTimeList, setInSideOrderDetailTimeList] = useState([]);
  useEffect(() => {
    if (leftEchart.length) {
      // roll(100);
    }
    return () => {
      clearInterval(timers);
    };
  }, [leftEchart]);
  let number = 1;
  useEffect(() => {
    const timerID = setInterval(() => {
      number = number + 1;
      if (number > 4) {
        number = 0;
      }
      tick(number);
    }, 10000);
    var cenData = [];
    for (var i = 1; i <= 7; i++) {
      cenData.push(GetDateStr(i));
    }
    setInSideOrderDetailTimeList(cenData);
    return () => {
      clearInterval(timerID);
    };
  }, []);
  const checkTime = (i) => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const tick = (number) => {
    setNum(number);
  };
  useEffect(() => {
    if (outSideOrderDetail.length <= 60) {
      if (num == 0) {
        initPlanEchartsData(0, 10);
      } else if (num == 1) {
        initPlanEchartsData(10, 20);
      } else if (num == 2) {
        initPlanEchartsData(20, 30);
      } else if (num == 3) {
        initPlanEchartsData(30, 40);
      } else if (num == 4) {
        initPlanEchartsData(40, outSideOrderDetail.length + 1);
      }
    } else if (outSideOrderDetail.length >= 21) {
      if (num == 0) {
        initPlanEchartsData(0, 10);
      } else if (num == 1) {
        initPlanEchartsData(10, outSideOrderDetail.length + 1);
      } else if (num == 2) {
        initPlanEchartsData(0, 10);
      } else if (num == 3) {
        initPlanEchartsData(10, outSideOrderDetail.length + 1);
      } else if (num == 4) {
        initPlanEchartsData(0, 10);
      }
    }
  }, [num]);
  useEffect(() => {
    InitialScroll(materialDemandList);
    return () => {
      return clearInterval(timer);
    };
  }, [materialDemandList]);
  const GetDateStr = (AddDayCount) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return checkTime(m) + '-' + checkTime(d);
  };
  const initPlanEchartsData = (start, end) => {
    var chartDom = document.getElementById('main-plan');
    myChartPlan = echarts.init(chartDom);
    axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then((rawData) => {
      _rawData = rawData.data;
      var allTimeST = outSideOrderDetail.slice(start, end);
      // .filter((item) => !compareTime(item.planStart, item.planEnd, new Date()));
      // const currentTime = outSideOrderDetail
      //   .slice(start, end)
      //   .filter((item) => compareTime(item.planStart, item.planEnd, new Date()));
      myChartPlan.setOption((option = makeOption(allTimeST)));
      // autoToolTip(myChartPlan, makeOption(outSideOrderDetail), {
      //   // 轮播间隔时间 默认2s
      //   interval: 4000,
      //   // 是否循环轮播所有序列
      //   loopSeries: false,
      //   // 第1个被轮播的序列下标
      //   seriesIndex: 0,
      // });
      // window.addEventListener("resize", function () {
      //   myChartPlan.resize();
      // });
      initDrag();
    });
  };
  useEffect(() => {
    leftEchart.forEach((item) => {
      if (
        item.leftEchartsPieInfoOne.planStart &&
        item.leftEchartsPieInfoOne.planEnd &&
        item.leftEchartsPieInfoOne.schedualStart &&
        item.leftEchartsPieInfoOne.schedualEnd
      ) {
        // const initArr = [
        //   {
        //     name: '计划开始时间',
        //     value: moment(item.leftEchartsPieInfoOne.planStart).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '最晚结束时间',
        //     value: moment(item.leftEchartsPieInfoOne.planEnd).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '排产起始时间',
        //     value: moment(item.leftEchartsPieInfoOne.schedualStart).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '排产结束时间',
        //     value: moment(item.leftEchartsPieInfoOne.schedualEnd).format('YYYY-MM-DD'),
        //   },
        // ];
        // const cenArr = compareFN(initArr, 'value');
        // if (compareTime1(cenArr[0].value, cenArr[1].value)) {
        //   item.leftEchartsPieInfoOneCurrent = 0;
        // } else if (compareTime1(cenArr[1].value, cenArr[2].value)) {
        //   item.leftEchartsPieInfoOneCurrent = 1;
        // } else if (compareTime1(cenArr[2].value, cenArr[3].value)) {
        //   item.leftEchartsPieInfoOneCurrent = 2;
        // } else {
        //   item.leftEchartsPieInfoOneCurrent = 3;
        // }
        // item.leftEchartsPieInfoOneSteps = cenArr;
        // const initArr = [
        //   {
        //     name: '计划开始时间',
        //     value: moment(item.leftEchartsPieInfoOne.planStart).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '最晚结束时间',
        //     value: moment(item.leftEchartsPieInfoOne.planEnd).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '排产起始时间',
        //     value: moment(item.leftEchartsPieInfoOne.schedualStart).format('YYYY-MM-DD'),
        //   },
        //   {
        //     name: '排产结束时间',
        //     value: moment(item.leftEchartsPieInfoOne.schedualEnd).format('YYYY-MM-DD'),
        //   },
        // ];
        var planStartValue = moment(item.leftEchartsPieInfoOne.planStart).format('MM-DD');
        var planEndValue = moment(item.leftEchartsPieInfoOne.planEnd).format('MM-DD');
        var schedualStartValue = moment(item.leftEchartsPieInfoOne.schedualStart).format('MM-DD');
        var schedualEndValue = moment(item.leftEchartsPieInfoOne.schedualEnd).format('MM-DD');

        var initArr = [
          //map if判断status
          {
            value: GetDateStr(1),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(2),
            color: '',
            status: '',
            index: null,
          },

          {
            value: GetDateStr(3),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(4),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(5),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(6),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(7),
            color: '',
            status: '',
            index: null,
          },
          {
            value: GetDateStr(8),
            color: '',
            status: [],
            index: null,
          },
        ];
        initArr.forEach((item, index) => {
          if (item.value >= planStartValue && item.value <= planEndValue) {
            item.color = 'skyblue';
            item.status = 'end';
            item.index = index;
          }
          if (item.value >= schedualStartValue && item.value <= schedualEndValue) {
            item.color = 'green';
            item.status = 'end';
            item.index = index;
          }
          if (
            item.value >= schedualStartValue &&
            item.value > planEndValue &&
            item.value <= schedualEndValue
          ) {
            item.color = 'red';
            item.status = 'end';
            item.index = index;
          }
        });
        console.log(
          planStartValue,
          planEndValue,
          schedualStartValue,
          schedualEndValue,
          'planStartValue-schedualEndValue',
        );
        console.log(initArr, 'initArrCen----initArrCen');
        item.leftEchartsPieInfoOneSteps = initArr;
      }
    });
  }, [leftEchart /* , currentTime */]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '物料类型',
      dataIndex: 'materialType',
      key: 'materialType',
      render: (text, record, index) => {
        if (record.materialType == 'blank') {
          return '毛坯';
        } else if (record.materialType == 'fixture') {
          return '夹具';
        } else if (record.materialType == 'tray') {
          return '托盘';
        } else if (record.materialType == 'tool') {
          return '刀具';
        }
      },
    },
    {
      title: '规格类型',
      dataIndex: 'Specs',
      key: 'Specs',
      //width: 5
    },
    {
      title: '需求数量',
      dataIndex: 'demandNum',
      key: 'demandNum',
    },
    {
      title: '库存数量',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity ',
    },
    {
      title: '物料是否充足',
      dataIndex: 'isAdequate',
      key: 'isAdequate ',
    },
    {
      title: '物料缺口数量',
      dataIndex: 'shortNum',
      key: 'shortNum ',
    },
  ];
  const customDotOne = (dot, { status, index }) => (
    <Popover
      content={
        // <span>
        //   step {index} status: {status}
        // </span>
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  const roll = (t) => {
    var ul1 = document.getElementById('leftEchart1');
    var ul2 = document.getElementById('leftEchart2');
    var ulbox = document.getElementById('review_box');
    //ul2.innerHTML = ul1.innerHTML;
    ulbox.scrollTop = 0; // 开始无滚动时设为0
    setTimers(setInterval(rollStart, t)); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
    // console.log(ulbox.scrollHeight - ulbox.scrollTop === ulbox.clientHeight, ' ulbox.scrollHeight - ulbox.scrollTop === ulbox.clientHeight')
    // 鼠标移入div时暂停滚动
    // ulbox.onmouseover = function () {
    //   clearInterval(timers);
    // }
    // 鼠标移出div后继续滚动
    // ulbox.onmouseout = function () {
    //   timers = setInterval(rollStart, t);
    // }
  };
  // 开始滚动函数
  const rollStart = () => {
    // 上面声明的DOM对象为局部对象需要再次声明
    var ul1 = document.getElementById('leftEchart1');
    var ul2 = document.getElementById('leftEchart2');
    var ulbox = document.getElementById('review_box');
    if (ulbox && ul1) {
      var result = ulbox.scrollHeight - ulbox.scrollTop === ulbox.clientHeight;
      if (result === false) {
        if (ulbox.scrollTop >= ul1.scrollHeight) {
          ulbox.scrollTop = 0;
        } else {
          ulbox.scrollTop = ulbox.scrollTop + 2;
        }
      } else {
        ulbox.scrollTop = 0;
        rollStart();
      }
    }
  };
  function makeOption(allTime) {
    console.log(allTime, 'allTime-allTime-allTime-allTime');
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
        // {
        //   type: 'slider',
        //   xAxisIndex: 0,
        //   filterMode: 'weakFilter',
        //   height: 20,
        //   bottom: 0,
        //   start: 0,
        //   end: 100,
        //   handleIcon:
        //     'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //   handleSize: '80%',
        //   showDetail: false,
        //   show: false,
        // },
        // {
        //   type: 'inside',
        //   id: 'insideX',
        //   xAxisIndex: 0,
        //   filterMode: 'weakFilter',
        //   start: 0,
        //   end: 26,
        //   zoomOnMouseWheel: false,
        //   moveOnMouseMove: true,
        // },
        // {//y轴
        //   type: 'slider',
        //   yAxisIndex: 0,
        //   zoomLock: true,
        //   width: 10,
        //   right: 10,
        //   top: 70,
        //   bottom: 20,
        //   start: 95,
        //   end: 100,
        //   handleSize: 0,
        //   showDetail: false
        // },
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
          data: inSideOrderDetailTimeList,
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
          id: 'flightDataLeft1',
          type: 'custom',
          renderItem: renderGanttItem,
          // dimensions: _rawData.flight.dimensions,
          dimensions: dimensionsList,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
          },
          itemStyle: {
            barBorderRadius: [50, 50, 50, 50],
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: '#37B6E0',
                },
                {
                  offset: 0.5,
                  color: '#0554A6',
                },
              ],
              false,
            ), // 线条颜色
          },
          data: allTime.map((item, index) => {
            return [index + 311].concat(
              item.planStart,
              item.planEnd,
              '产品名称:' +
                item.productName +
                '/需求数量:' +
                item.productNum +
                '/计划等级:' +
                item.planLevel,
            );
          }),
        },
        // {
        //   //内容值
        //   id: 'flightDataLeft2',
        //   type: 'custom',
        //   renderItem: renderGanttItem,
        //   // dimensions: _rawData.flight.dimensions,
        //   dimensions: dimensionsList,
        //   encode: {
        //     x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
        //     y: DIM_CATEGORY_INDEX,
        //     tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
        //   },
        //   itemStyle: {
        //     barBorderRadius: [50, 50, 50, 50],
        //     color: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       1,
        //       0,
        //       [
        //         {
        //           offset: 0,
        //           color: '#FE8B24',
        //         },
        //         {
        //           offset: 1,
        //           color: '#0554A6',
        //         },
        //       ],
        //       false,
        //     ), // 线条颜色
        //   },
        //   data: currentTime.map((item, index) => {
        //     return [index + 305].concat(
        //       item.planStart,
        //       item.planEnd,
        //       '产品名称:' +
        //       item.productName +
        //       '/需求数量:' +
        //       item.productNum +
        //       '/计划等级:' +
        //       item.planLevel,
        //     );
        //   }),
        // },
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
    var flightNumber = api.value(3) + '';
    var flightNumberWidth = echarts.format.getTextRect(flightNumber).width;
    var text = flightNumber;
    var rectNormal = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: 29,
    });
    var rectVIP = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: 29,
    });
    var rectText = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: 29,
    });
    return {
      type: 'group',
      children: [
        {
          type: 'rect',
          ignore: !rectNormal,
          shape: rectNormal,
          style: api.style(),
        },
        {
          type: 'rect',
          ignore: !rectVIP && !api.value(4),
          shape: rectVIP,
          style: api.style(),
        },
        {
          type: 'rect',
          ignore: !rectText,
          shape: rectText,
          style: api.style({
            fill: 'transparent',
            stroke: 'transparent',
            text: text,
            textFill: '#fff',
          }),
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
    myChartPlan.setOption({
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
    myChartPlan.on('mousedown', function (param) {
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
    myChartPlan.getZr().on('mousemove', function (event) {
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
    myChartPlan.getZr().on('mouseup', function () {
      // Drop
      if (_draggingEl && _dropRecord) {
        updateRawData() &&
          myChartPlan.setOption({
            series: [
              {
                id: 'flightDataLeft1',
                data: _rawData.flight.data,
              },
              {
                id: 'flightDataLeft2',
                data: _rawData.flight.data,
              },
            ],
          });
      }
      dragRelease();
    });
    myChartPlan.getZr().on('globalout', dragRelease);
    function dragRelease() {
      _autoDataZoomAnimator.stop();
      if (_draggingEl) {
        myChartPlan.getZr().remove(_draggingEl);
        _draggingEl = null;
      }
      if (_dropShadow) {
        myChartPlan.getZr().remove(_dropShadow);
        _dropShadow = null;
      }
      _dropRecord = _draggingRecord = null;
    }
    function addOrUpdateBar(el, itemData, style, z) {
      var pointArrival = myChartPlan.convertToPixel('grid', [
        itemData.timeArrival,
        itemData.categoryIndex,
      ]);
      var pointDeparture = myChartPlan.convertToPixel('grid', [
        itemData.timeDeparture,
        itemData.categoryIndex,
      ]);
      var barLength = pointDeparture[0] - pointArrival[0];
      var barHeight =
        Math.abs(
          myChartPlan.convertToPixel('grid', [0, 0])[1] -
            myChartPlan.convertToPixel('grid', [0, 1])[1],
        ) * HEIGHT_RATIO;
      if (!el) {
        el = new echarts.graphic.Rect({
          shape: { x: 0, y: 0, width: 0, height: 0 },
          style: style,
          z: z,
        });
        myChartPlan.getZr().add(el);
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
      var cursorData = myChartPlan.convertFromPixel('grid', [xPixel, yPixel]);
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
      var flightDataLeft1 = _rawData.flight.data;
      var movingItem = flightDataLeft1[_draggingRecord.dataIndex];
      // Check conflict
      for (var i = 0; i < flightDataLeft1.length; i++) {
        var dataItem = flightDataLeft1[i];
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
      var option = myChartPlan.getOption();
      var optionInsideX = option.dataZoom[DATA_ZOOM_X_INSIDE_INDEX];
      var optionInsideY = option.dataZoom[DATA_ZOOM_Y_INSIDE_INDEX];
      var batch = [];
      prepareBatch(batch, 'insideX', optionInsideX.start, optionInsideX.end, params.cursorDistX);
      prepareBatch(batch, 'insideY', optionInsideY.start, optionInsideY.end, -params.cursorDistY);
      batch.length &&
        myChartPlan.dispatchAction({
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
  const compareFN = (arr, property) => {
    var i = 0;
    var j = 0;
    let t;
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr.length; j++) {
        if (arr[i][property] < arr[j][property]) {
          t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
        }
      }
    }
    return arr;
  };
  const compareTime1 = (stime, etime) => {
    // 转换时间格式，并转换为时间戳
    // console.log(stime, etime, nowTime1, '6667777');
    function tranDate(time) {
      return new Date(time.replace(/-/g, '/')).getTime();
    }
    // 开始时间
    let startTime = tranDate(stime);
    // 结束时间
    let endTime = tranDate(etime);
    let thisDate = currentTime;
    // 根据选中日期传值，格式为 2018-9-10 20:08
    let nowTime = tranDate(thisDate);
    // 如果当前时间处于时间段内，返回true，否则返回false
    if (nowTime <= startTime || nowTime >= endTime) {
      return false;
    }
    return true;
  };
  const compareTime = (stime, etime) => {
    // 转换时间格式，并转换为时间戳
    function tranDate(time) {
      return new Date(time.replace(/-/g, '/')).getTime();
    }
    // 开始时间
    let startTime = tranDate(stime);
    // 结束时间
    let endTime = tranDate(etime);
    let thisDate = currentTime;
    // 根据选中日期传值，格式为 2018-9-10 20:08
    let nowTime = tranDate(thisDate);
    // 如果当前时间处于时间段内，返回true，否则返回false
    if (nowTime < startTime || nowTime > endTime) {
      return false;
    }
    return true;
  };
  const setRowClass = (record) => {
    if (record.isAdequate == '否') {
      return 'rowClass';
    } else {
      return '';
    }
  };
  const InitialScroll = (data) => {
    let v = document.getElementsByClassName('ant-table-body')[0];
    // if (data && data.length > 3)  // 只有当大于三条数据的时候 才会看起滚动
    // {
    let time = setInterval(() => {
      v.scrollTop += 3.5;
      if (Math.ceil(v.scrollTop) >= parseFloat(v.scrollHeight - v.clientHeight)) {
        v.scrollTop = 0;
        // setTimeout(() => { v.scrollTop = 0 }, 1000)
      }
    }, 200);
    setTimer(time); // 定时器保存变量 利于停止
    // }
  };
  return (
    <div className="left-center">
      <Row>
        //
        <Col span={9}>
          <div className="plan-mark-total">
            <ul className="back-line-list">
              <li className="one"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="plan-mark-title">
              <div className="jian-tou"></div>
              <span>计划号集合</span>
            </div>
            <div id="main-plan" ref={mainPlan}></div>
            {/* <ul className='data-list'>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
          </ul>
          <ul className='data-last-line'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li>计划开始时间</li>
            <li>计划结束时间</li>
          </ul> */}
          </div>
        </Col>
        <Col span={7}>
          <div
            // onMouseEnter={() => {
            //   if (timer) clearTimeout(timer); // 如果之前有定时器 先把之前的定时器取消
            //   clearInterval(timer);
            // }}
            // onMouseLeave={() => {
            //   if (timer) clearTimeout(timer); // 如果之前有定时器 先把之前的定时器取消
            //   InitialScroll(materialDemandList);
            // }}
            className="table-material-wrap"
          >
            <div className="plan-mark-title">
              <div className="jian-tou"></div>
              <span>资源需求清单</span>
            </div>
            <Table
              id="cyclicScroll"
              scroll={{ y: 110 }}
              className="table-material"
              columns={columns}
              rowClassName={setRowClass}
              scroll={{ x: 'max-content', y: 680 }}
              rowKey={'Specs'}
              dataSource={materialDemandList}
              pagination={false}
            />
          </div>
        </Col>
        <Col span={5} push={2}>
          <div id="review_box" className="review_box">
            <ul id="leftEchart1" className="leftEchart1">
              {leftEchart.map((item, index) => {
                return (
                  <li key={index}>
                    <ReactEchartsCom option={item.leftEchartsPieOne} />
                    <div>
                      <ul>
                        <li className="title">
                          <span>计划编号</span>
                          <Tooltip title={item.leftEchartsPieInfoOne.planNO}>
                            <span>{item.leftEchartsPieInfoOne.planNO}</span>
                          </Tooltip>
                        </li>
                        <li className="title">
                          <span>产品名称</span>
                          <span>{item.leftEchartsPieInfoOne.productName}</span>
                        </li>
                        <li className="title">
                          <span>计划等级</span>
                          <span>{item.leftEchartsPieInfoOne.planLevel}</span>
                        </li>
                        <li className="title"></li>
                        <li className="title-button">
                          <span className={item.yijiagongCount != '100%' ? 'active' : ''}>
                            加工中
                          </span>
                          <span
                            className={
                              item.leftEchartsPieInfoOneCurrent == '未加工' ? 'active' : ''
                            }
                          >
                            未加工
                          </span>
                          <span className={item.yijiagongCount == '100%' ? 'active' : ''}>
                            已加工
                          </span>
                        </li>
                      </ul>
                      {/* <Steps
                        className="steps"
                        // current={item.leftEchartsPieInfoOneCurrent}
                        progressDot={customDotOne}
                      >
                        {item.leftEchartsPieInfoOneSteps.map((item) => {
                          return <Step title={item.name} description={item.value} status={item.status} />;
                        })}
                      </Steps> */}
                      <ul className="steps-div">
                        {item.leftEchartsPieInfoOneSteps.map((item, index) => {
                          return (
                            <li key={index}>
                              <span
                                style={{
                                  background: item.color ? item.color : '#f0f0f0',
                                }}
                              ></span>
                              <span
                                style={{
                                  background: item.color ? item.color : '#f0f0f0',
                                  display: index === 7 ? 'none' : 'block',
                                }}
                              ></span>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="steps-div-date">
                        {item.leftEchartsPieInfoOneSteps.map((item, index) => {
                          return <li key={index}>{item.value}</li>;
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul id="leftEchart2" className="leftEchart2"></ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  (state) => ({ time: state.leftCenter.time }),
  (dispatch) => ({
    getVirtualmeterList: (payload) => dispatch({ type: 'leftCenter/getVirtualmeterList', payload }),
  }),
)(leftCenter);