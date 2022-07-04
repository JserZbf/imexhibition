import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'
import * as echarts from 'echarts'
import moment from 'moment';
import LeftTop from '../leftTop/index'
import LeftCenter from '../leftCenter/index'
import LeftBottom from '../leftBottom/index'
import RightTop from '../rightTop/index'
import RightCenter from '../rightCenter/index'
import RightBottom from '../rightBottom/index'
// 添加请求拦截器
import axios from 'axios'
axios.interceptors.request.use((config) => {
  config.url = config.url;
  let headers = {};
  let token = window.localStorage.getItem('token');
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  return {
    ...config,
    headers
  }
})
const Home = function (props) {
  const [allData, setAllData] = useState({});
  const [materialTypeSixList, setMaterialTypeSixList] = useState([]);
  const [rightBottomInfor, setRightBottomInfor] = useState({});
  const [finishPlanObj, setFinishPlanObj] = useState({});
  const [diffAlgorithmX, setDiffAlgorithmX] = useState([]);
  const [diffAlgorithmY, setDiffAlgorithmY] = useState([]);
  const [arrName, setArrName] = useState();
  const [sumValue, setSumValue] = useState();
  const [objData, setObjData] = useState();
  const [optionData, setOptionData] = useState({});
  const [fourWeekOutputStatistics, setFourWeekOutputStatistics] = useState({});
  const [fourWeekEnergyConsumption, setFourWeekEnergyConsumption] = useState({});
  const [fourWeekUseTrend, setFourWeekUseTrend] = useState({});
  const [fourWeekUtilizationRate, setFourWeekUtilizationRate] = useState({});
  const [leftEchartsPieOne, setLeftEchartsPieOne] = useState({})
  const [leftEchartsPieTwo, setLeftEchartsPieTwo] = useState({})
  const [leftEchartsPieThree, setLeftEchartsPieThree] = useState({})
  const [leftEchartsPieFour, setLeftEchartsPieFour] = useState({})
  const [leftEchartsPieInfoOne, setLeftEchartsPieInfoOne] = useState({});
  const [leftEchartsPieInfoTwo, setLeftEchartsPieInfoTwo] = useState({});
  const [leftEchartsPieInfoThree, setLeftEchartsPieInfoThree] = useState({});
  const [leftEchartsPieInfoFour, setLeftEchartsPieInfoFour] = useState({});
  const [rightEchartsStateRatioOne, setRightEchartsStateRatioOne] = useState({})
  const [rightEchartsDayOutputOne, setRightEchartsDayOutputOne] = useState({})
  const [rightEchartsStateRatioTwo, setRightEchartsStateRatioTwo] = useState({})
  const [rightEchartsDayOutputTwo, setRightEchartsDayOutputTwo] = useState({})
  const [rightEchartsStateRatioThree, setRightEchartsStateRatioThree] = useState({})
  const [rightEchartsDayOutputThree, setRightEchartsDayOutputThree] = useState({})
  const [rightEchartsStateRatioFour, setRightEchartsStateRatioFour] = useState({})
  const [rightEchartsDayOutputFour, setRightEchartsDayOutputFour] = useState({})
  const [rightEchartsStateRatioFive, setRightEchartsStateRatioFive] = useState({})
  const [rightEchartsDayOutputFive, setRightEchartsDayOutputFive] = useState({})
  const [infoOne, setInfoOne] = useState({});
  const [infoTwo, setInfoTwo] = useState({});
  const [infoThree, setInfoThree] = useState({});
  const [infoFour, setInfoFour] = useState({});
  const [infoFive, setInfoFive] = useState({});
  const [deviceUseTime, setDeviceUseTime] = useState();
  const [ganTeData, setGanTeData] = useState([]);
  ///甘特图变量
  var ROOT_PATH =
    'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
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
  useEffect(() => {
    const obj = {
      "taskId": "202205251042350001",
      "scheduleTarget": 1,
      "schedulePattern": 2,
      "scheduleCycle": 7,
      "orderDetail": [
        {
          "planNO": "2022051021330739627200001",
          "productName": "12M33机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-16"
        },
        {
          "planNO": "2022051021330742024300002",
          "productName": "8M33机体",
          "productNum": 8,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742123900003",
          "productName": "WP3H机体",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742223800004",
          "productName": "P15NG机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742323800005",
          "productName": "P8H国六缸盖",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742423300006",
          "productName": "16M33总成",
          "productNum": 4,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742523100007",
          "productName": "WP8机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742718700008",
          "productName": "P11机体",
          "productNum": 6,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742822500009",
          "productName": "WP13H缸盖",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742922000010",
          "productName": "46吨阀体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743021600011",
          "productName": "P8GH机体",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743121700012",
          "productName": "H2缸盖吕框架",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743221200013",
          "productName": "H2缸盖",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743320800014",
          "productName": "P11H机体",
          "productNum": 6,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743420600015",
          "productName": "P8H机体",
          "productNum": 7,
          "planType": "产品加工",
          "planLevel": 1,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-13"
        }
      ]
    }
    props.getAllData(obj).then(res => {
      setAllData(res);
      // const oneCen = res.materialDemandList.slice(0, 5).concat({ shortNum: 666, supplyTime: '2022/7/2' })
      const oneCen = res.materialDemandList.slice(0, 6);
      const arrCen = oneCen.map((item, index) => {
        if (item.supplyTime == moment(new Date()).format('YYYY/M/DD')||item.supplyTime == moment(new Date()).format('YYYY/M/D')) {
          return {
            ...item,
            flagBool: true
          }
        } else {
          return {
            ...item,
            flagBool: false
          }
        }
      })
      setMaterialTypeSixList(arrCen);//物料类型六个卡片
      setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics);//右下角信息
      setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics);//计划完成率相关信息
      const cenY=res.orderStatisticsInfo.algorithmComparisonData.Y.map(item=>{
       return Number((-10000*item))
      })
      setDiffAlgorithmY(cenY)//不同算法对比信息图
      setDiffAlgorithmX(res.orderStatisticsInfo.algorithmComparisonData.X);
      const fourWeekFinishRateTran = res.orderStatisticsInfo.fourWeekFinishRate.X.map((item, index) => {
        return {
          name: item,
          value: res.orderStatisticsInfo.fourWeekFinishRate.Y[index]
        }
      })
      setArrName(getArrayValue(fourWeekFinishRateTran, "name"));
      setSumValue(eval(getArrayValue(fourWeekFinishRateTran, "value").join('+')));
      setObjData(array2obj(fourWeekFinishRateTran, "name"));
      setOptionData(getData(fourWeekFinishRateTran));//最近四周趋势对比图
      setFourWeekOutputStatistics(res.orderStatisticsInfo.fourWeekOutputStatistics);//aps系统可适应不用加工类型图表
      setFourWeekEnergyConsumption(res.deviceStatisticsInfo.fourWeekEnergyConsumption);//预计设备不同状态图表
      setFourWeekUseTrend(res.deviceStatisticsInfo.fourWeekUseTrend);//最近四周使用率趋势图
      setFourWeekUtilizationRate(res.deviceStatisticsInfo.fourWeekUtilizationRate);//近四周设备利用率变化趋势
      tranOrderCardDetail(res.orderCardDetail);//计划状态卡片四个饼图option
      tranDeviceCardDetail(res.deviceCardDetail)//每台设备卡片十个折线图option、
      setDeviceUseTime(res.deviceStatisticsInfo.deviceUseTime);//机床可用时间
      var chartDom = document.getElementById('main');
      myChart = echarts.init(chartDom);
      axios.get(ROOT_PATH + '/data/asset/data/airport-schedule.json').then(rawData => {
        //console.log(rawData, 'rawData______________', ROOT_PATH);
        _rawData = rawData.data;
        setGanTeData(res.orderScheduleDetail);
        const cen = res.orderScheduleDetail.map((item, index) => {
          return {
            ...item,
            currentColor: color16(),
            yValue: index
          }
        })
        myChart.setOption((option = makeOption(cen)));
        initDrag();
      });
    })

  }, [])
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
    let currentTime = thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate() + ' ' + thisDate.getHours() + ':' + thisDate.getMinutes();
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
  }
  const color16 = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  }
  const GetNumberOfDays = (date1, date2) => {//获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    //  console.log(day, 'day-day-1111111111111111');
    return day
  };

  const addDate = (dateStr, diffDay) => {
    var dateTime = (new Date(dateStr)).getTime();
    var diffTimeLong = dateTime + (diffDay) * 24 * 3600 * 1000;
    var diffTime = new Date(diffTimeLong);
    var m = (diffTime.getMonth() + 1) < 10 ? "0" + (diffTime.getMonth() + 1) : (diffTime.getMonth() + 1);
    var d = diffTime.getDate() < 10 ? "0" + diffTime.getDate() : diffTime.getDate();
    return diffTime.getFullYear() + "-" + m + "-" + d;
  }
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
          percent = (cenValue / obj.productNum * 100) * index + '%';
        }
      }
    } else if (cen == 'right') {
      value = 100;
      processedValue = obj.productNum;
      percent = 100 + '%';
    }
    return [value, percent, processedValue]
  }
  const tranOrderCardDetail = (data) => {
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
          color: "#0bb6f0",
          fontSize: 20
        }
      },
      //backgroundColor: '#011128',
      // backgroundColor:'pink',
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: ['70%', '80%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        },
        hoverAnimation: false,
        data: [{
          value: tranData(data[0])[0],
          name: '01',
          itemStyle: {
            normal: {
              color: '#6879F7',//已完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
          label: {
            normal: {
              rich: {
                a: {
                  color: '#3a7ad5',
                  align: 'center',
                  fontSize: 20,
                  fontWeight: "bold"
                },
                b: {
                  color: '#fff',
                  align: 'center',
                  fontSize: 16
                }
              },
              formatter: function (params) {
                console.log(tranData(data[0]), 'tranData(data[0])');
                const [value, percent, processedValue] = tranData(data[0]);
                return "{b|100%}\n\n" + "{b|计划产量" + data[0].productNum + "件}" + "\n\n{b|" + percent + "}" + "\n\n{b|已加工" + processedValue + "件}";
              },
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'normal',
                color: '#fff'
              }
            }
          },
        }, {
          value: 100 - tranData(data[0])[0],
          name: '',
          itemStyle: {
            normal: {
              color: '#071D58',//未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        },
        ]
      }, {
        name: 'Line 2',
        type: 'pie',
        animation: false,
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            color: '#7CA9FF',//外层圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)'//外层圆环的颜色
          }
        },
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 100,
          name: '02',
        }
        ]
      },
      ]
    }
    setLeftEchartsPieOne(echartsList1);
    const echartsList2 = {
      title: {
        text: '',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: "#0bb6f0",
          fontSize: 20
        }
      },
      //backgroundColor: '#011128',
      // backgroundColor:'pink',
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: ['70%', '80%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        },
        hoverAnimation: false,
        data: [{
          value: tranData(data[1])[0],
          name: '01',
          itemStyle: {
            normal: {
              color: '#6879F7',//已完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
          label: {
            normal: {
              rich: {
                a: {
                  color: '#3a7ad5',
                  align: 'center',
                  fontSize: 20,
                  fontWeight: "bold"
                },
                b: {
                  color: '#fff',
                  align: 'center',
                  fontSize: 16
                }
              },
              formatter: function (params) {
                const [value, percent, processedValue] = tranData(data[1]);
                return "{b|100%}\n\n" + "{b|计划产量" + data[1].productNum + "件}" + "\n\n{b|" + percent + "}" + "\n\n{b|已加工" + processedValue + "件}";
              },
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'normal',
                color: '#fff'
              }
            }
          },
        }, {
          value: 100 - tranData(data[1])[0],
          name: '',
          itemStyle: {
            normal: {
              color: '#071D58',//未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          }
        },
        ]
      }, {
        name: 'Line 2',
        type: 'pie',
        animation: false,
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            color: '#7CA9FF',//外层圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)'//外层圆环的颜色
          }
        },
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 100,
          name: '02',
        }
        ]
      },
      ]
    }
    setLeftEchartsPieTwo(echartsList2);
    const echartsList3 = {
      title: {
        text: '',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: "#0bb6f0",
          fontSize: 20
        }
      },
      //backgroundColor: '#011128',
      // backgroundColor:'pink',
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: ['70%', '80%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        },
        hoverAnimation: false,
        data: [{
          value: tranData(data[2])[0],
          name: '01',
          itemStyle: {
            normal: {
              color: '#6879F7',//已完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
          label: {
            normal: {
              rich: {
                a: {
                  color: '#3a7ad5',
                  align: 'center',
                  fontSize: 20,
                  fontWeight: "bold"
                },
                b: {
                  color: '#fff',
                  align: 'center',
                  fontSize: 16
                }
              },
              formatter: function (params) {
                const [value, percent, processedValue] = tranData(data[2]);
                return "{b|100%}\n\n" + "{b|计划产量" + data[2].productNum + "件}" + "\n\n{b|" + percent + "}" + "\n\n{b|已加工" + processedValue + "件}";
              },
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'normal',
                color: '#fff'
              }
            }
          },
        }, {
          value: 100 - tranData(data[2])[0],
          name: '',
          itemStyle: {
            normal: {
              color: '#071D58',//未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        },
        ]
      }, {
        name: 'Line 2',
        type: 'pie',
        animation: false,
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            color: '#7CA9FF',//外层圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)'//外层圆环的颜色
          }
        },
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 100,
          name: '02',
        }
        ]
      },
      ]
    }
    setLeftEchartsPieThree(echartsList3);
    const echartsList4 = {
      title: {
        text: '',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: "#0bb6f0",
          fontSize: 20
        }
      },
      //backgroundColor: '#011128',
      // backgroundColor:'pink',
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: ['70%', '80%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        },
        label: {
          normal: {
            rich: {
              a: {
                color: '#3a7ad5',
                align: 'center',
                fontSize: 20,
                fontWeight: "bold"
              },
              b: {
                color: '#fff',
                align: 'center',
                fontSize: 16
              }
            },
            formatter: function (params) {
              const [value, percent, processedValue] = tranData(data[3]);
              return "{b|100%}\n\n" + "{b|计划产量" + data[3].productNum + "件}" + "\n\n{b|" + percent + "}" + "\n\n{b|已加工" + processedValue + "件}";
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              color: '#fff'
            }
          }
        },
        hoverAnimation: false,
        data: [{
          value: tranData(data[3])[0],
          name: '01',
          itemStyle: {
            normal: {
              color: '#6879F7',//已完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        }, {
          value: 100 - tranData(data[3])[0],
          name: '',
          itemStyle: {
            normal: {
              color: '#071D58',//未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        },
        ]
      }, {
        name: 'Line 2',
        type: 'pie',
        animation: false,
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            color: '#7CA9FF',//外层圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)'//外层圆环的颜色
          }
        },
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 100,
          name: '02',
        }
        ]
      },
      ]
    }
    setLeftEchartsPieFour(echartsList4);
  }
  const tranDeviceCardDetail = (data) => {
    // console.log(data, 'data-data-data');
    const info1 = {
      deviceName: data[0].deviceName,
      runTimeRate: ((data[0].runTimeRate) * 100).toFixed(2) + '%',
      isFinishMaintain: data[0].isFinishMaintain
    }
    setInfoOne(info1);
    const info2 = {
      deviceName: data[1].deviceName,
      runTimeRate: ((data[1].runTimeRate) * 100).toFixed(2) + '%',
      isFinishMaintain: data[1].isFinishMaintain
    }
    setInfoTwo(info2);
    const info3 = {
      deviceName: data[2].deviceName,
      runTimeRate: ((data[2].runTimeRate) * 100).toFixed(2) + '%',
      isFinishMaintain: data[2].isFinishMaintain
    }
    setInfoThree(info3);
    const info4 = {
      deviceName: data[3].deviceName,
      runTimeRate: ((data[3].runTimeRate) * 100).toFixed(2) + '%',
      isFinishMaintain: data[3].isFinishMaintain
    }
    setInfoFour(info4);
    const info5 = {
      deviceName: data[4].deviceName,
      runTimeRate: ((data[4].runTimeRate) * 100).toFixed(2) + '%',
      isFinishMaintain: data[4].isFinishMaintain
    }
    setInfoFive(info5);
    const echartsListLeft1 = {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: {
        data: data[0].dayOutput.X,
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3966EA',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: 16,
          },
          margin: 5, //刻度标签与轴线之间的距离。
        },

      },
      yAxis: [
        {
          name: '排产每日产量',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{ //三个最低下的圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, 0],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#3966EA'
        },
        "data": data[0].dayOutput.X.map(item => {
          return item = 0.5;
        })
      },
      //下半截柱状图
      {
        name: '2020',
        type: 'bar',
        barWidth: 15,
        barMinHeight: 5,
        barGap: '-100%',
        itemStyle: { //lenged文本
          opacity: .7,
          color: '#2D529D'
        },

        data: data[0].dayOutput.Y
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: data[0].dayOutput.Y
      },

      {
        "name": "", //头部
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -3],
        "z": 12,
        "symbolPosition": "end",
        itemStyle: {
          color: '#163F7A',
          opacity: 1,
        },
        "data": data[0].dayOutput.Y
      },

      {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#E567FF'
        },
        "symbolPosition": "end",
        data: data[0].dayOutput.Y
      },
      {
        name: '2019',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        z: 0,
        itemStyle: {
          color: '#163F7A',
          opacity: .7,
        },
        data: data[0].dayOutput.Y
      }
      ]
    }
    setRightEchartsDayOutputOne(echartsListLeft1);
    const echartsListRight1 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
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
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              }, {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
        }
      },
      legend: {
        align: "left",
        right: '0%',
        top: '0%',
        type: 'plain',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        // icon:'rect',
        itemGap: 25,
        itemWidth: 18,
        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

        data: [
          // {
          //     name: '上学'
          // },
          // {
          //     name: '到校'
          // },
          // {
          //     name: '放学'
          // }
        ]
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fffff',
            width: 2,
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fffff',
            padding: 16,
            fontSize: 14
          },
          formatter: function (data) {
            return data
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ''
          },
        },
        axisTick: {
          show: false,
        },
        data: data[0].stateRatio.X
      }],
      yAxis: [
        {
          name: '状态占比',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{
        name: '待机时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#61D1FF"
            },
            {
              offset: 1,
              color: "#E436AA"
            }
            ], false), // 线条颜色
          },
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#61D1FF"
          },
          {
            offset: 1,
            color: "#E436AA"
          }
          ], false),
        },
        itemStyle: {
          color: "red",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(135, 54, 228, 1)"
            },
            {
              offset: 1,
              color: "rgba(97, 209, 255, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[0].stateRatio.Y1
      }, {
        name: '故障维修时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(228, 54, 170, 1)"
            },
            {
              offset: 1,
              color: "rgba(40, 107, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[0].stateRatio.Y2
      }, {
        name: '加工时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160, 54, 228, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(83, 132, 222, 1)"
            }, {
              offset: 1,
              color: "rgba(40, 182, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[0].stateRatio.Y3
      }]
    }
    setRightEchartsStateRatioOne(echartsListRight1);
    const echartsListLeft2 = {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: {
        data: data[1].dayOutput.X,
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3966EA',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: 16,
          },
          margin: 5, //刻度标签与轴线之间的距离。
        },

      },
      yAxis: [
        {
          name: '排产每日产量',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{ //三个最低下的圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, 0],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#3966EA'
        },
        "data": data[1].dayOutput.X.map(item => {
          return item = 0.5;
        })
      },
      //下半截柱状图
      {
        name: '2020',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        itemStyle: { //lenged文本
          opacity: .7,
          color: '#2D529D'
        },

        data: data[1].dayOutput.Y
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: data[1].dayOutput.Y
      },

      {
        "name": "", //头部
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -3],
        "z": 12,
        "symbolPosition": "end",
        itemStyle: {
          color: '#163F7A',
          opacity: 1,
        },
        "data": data[1].dayOutput.Y
      },

      {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#E567FF'
        },
        "symbolPosition": "end",
        data: data[1].dayOutput.Y
      },
      {
        name: '2019',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        z: 0,
        itemStyle: {
          color: '#163F7A',
          opacity: .7,
        },
        data: data[1].dayOutput.Y
      }
      ]
    }
    setRightEchartsDayOutputTwo(echartsListLeft2);
    const echartsListRight2 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
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
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              }, {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
        }
      },
      legend: {
        align: "left",
        right: '0%',
        top: '0%',
        type: 'plain',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        // icon:'rect',
        itemGap: 25,
        itemWidth: 18,
        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

        data: [
          // {
          //     name: '上学'
          // },
          // {
          //     name: '到校'
          // },
          // {
          //     name: '放学'
          // }
        ]
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fffff',
            width: 2,
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fffff',
            padding: 16,
            fontSize: 14
          },
          formatter: function (data) {
            return data
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ''
          },
        },
        axisTick: {
          show: false,
        },
        data: data[1].stateRatio.X
      }],
      yAxis: [
        {
          name: '状态占比',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{
        name: '待机时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#61D1FF"
            },
            {
              offset: 1,
              color: "#E436AA"
            }
            ], false), // 线条颜色
          },
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#61D1FF"
          },
          {
            offset: 1,
            color: "#E436AA"
          }
          ], false),
        },
        itemStyle: {
          color: "red",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(135, 54, 228, 1)"
            },
            {
              offset: 1,
              color: "rgba(97, 209, 255, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[1].stateRatio.Y1
      }, {
        name: '故障维修时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(228, 54, 170, 1)"
            },
            {
              offset: 1,
              color: "rgba(40, 107, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[1].stateRatio.Y2
      }, {
        name: '加工时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160, 54, 228, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(83, 132, 222, 1)"
            }, {
              offset: 1,
              color: "rgba(40, 182, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[1].stateRatio.Y3
      }]
    }
    setRightEchartsStateRatioTwo(echartsListRight2);
    const echartsListLeft3 = {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: {
        data: data[2].dayOutput.X,
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3966EA',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: 16,
          },
          margin: 5, //刻度标签与轴线之间的距离。
        },

      },
      yAxis: [
        {
          name: '排产每日产量',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{ //三个最低下的圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, 0],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#3966EA'
        },
        "data": data[2].dayOutput.X.map(item => {
          return item = 0.5;
        })
      },
      //下半截柱状图
      {
        name: '2020',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        itemStyle: { //lenged文本
          opacity: .7,
          color: '#2D529D'
        },

        data: data[2].dayOutput.Y
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: data[2].dayOutput.Y
      },

      {
        "name": "", //头部
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -3],
        "z": 12,
        "symbolPosition": "end",
        itemStyle: {
          color: '#163F7A',
          opacity: 1,
        },
        "data": data[2].dayOutput.Y
      },

      {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#E567FF'
        },
        "symbolPosition": "end",
        data: data[2].dayOutput.Y
      },
      {
        name: '2019',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        z: 0,
        itemStyle: {
          color: '#163F7A',
          opacity: .7,
        },
        data: data[2].dayOutput.Y
      }
      ]
    }
    setRightEchartsDayOutputThree(echartsListLeft3);
    const echartsListRight3 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
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
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              }, {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
        }
      },
      legend: {
        align: "left",
        right: '0%',
        top: '0%',
        type: 'plain',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        // icon:'rect',
        itemGap: 25,
        itemWidth: 18,
        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

        data: [
          // {
          //     name: '上学'
          // },
          // {
          //     name: '到校'
          // },
          // {
          //     name: '放学'
          // }
        ]
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fffff',
            width: 2,
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fffff',
            padding: 16,
            fontSize: 14
          },
          formatter: function (data) {
            return data
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ''
          },
        },
        axisTick: {
          show: false,
        },
        data: data[2].stateRatio.X
      }],
      yAxis: [
        {
          name: '状态占比',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{
        name: '待机时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#61D1FF"
            },
            {
              offset: 1,
              color: "#E436AA"
            }
            ], false), // 线条颜色
          },
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#61D1FF"
          },
          {
            offset: 1,
            color: "#E436AA"
          }
          ], false),
        },
        itemStyle: {
          color: "red",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(135, 54, 228, 1)"
            },
            {
              offset: 1,
              color: "rgba(97, 209, 255, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[2].stateRatio.Y1
      }, {
        name: '故障维修时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(228, 54, 170, 1)"
            },
            {
              offset: 1,
              color: "rgba(40, 107, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[2].stateRatio.Y2
      }, {
        name: '加工时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160, 54, 228, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(83, 132, 222, 1)"
            }, {
              offset: 1,
              color: "rgba(40, 182, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[2].stateRatio.Y3
      }]
    }
    setRightEchartsStateRatioThree(echartsListRight3);
    const echartsListLeft4 = {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: {
        data: data[3].dayOutput.X,
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3966EA',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: 16,
          },
          margin: 5, //刻度标签与轴线之间的距离。
        },

      },
      yAxis: [
        {
          name: '排产每日产量',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{ //三个最低下的圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, 0],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#3966EA'
        },
        "data": data[3].dayOutput.X.map(item => {
          return item = 0.5;
        })
      },
      //下半截柱状图
      {
        name: '2020',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        itemStyle: { //lenged文本
          opacity: .7,
          color: '#2D529D'
        },

        data: data[3].dayOutput.Y
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: data[3].dayOutput.Y
      },

      {
        "name": "", //头部
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -3],
        "z": 12,
        "symbolPosition": "end",
        itemStyle: {
          color: '#163F7A',
          opacity: 1,
        },
        "data": data[3].dayOutput.Y
      },

      {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#E567FF'
        },
        "symbolPosition": "end",
        data: data[3].dayOutput.Y
      },
      {
        name: '2019',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        z: 0,
        itemStyle: {
          color: '#163F7A',
          opacity: .7,
        },
        data: data[3].dayOutput.Y
      }
      ]
    }
    setRightEchartsDayOutputFour(echartsListLeft4);
    const echartsListRight4 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
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
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              }, {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
        }
      },
      legend: {
        align: "left",
        right: '0%',
        top: '0%',
        type: 'plain',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        // icon:'rect',
        itemGap: 25,
        itemWidth: 18,
        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

        data: [
          // {
          //     name: '上学'
          // },
          // {
          //     name: '到校'
          // },
          // {
          //     name: '放学'
          // }
        ]
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fffff',
            width: 2,
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fffff',
            padding: 16,
            fontSize: 14
          },
          formatter: function (data) {
            return data
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ''
          },
        },
        axisTick: {
          show: false,
        },
        data: data[3].stateRatio.X
      }],
      yAxis: [
        {
          name: '状态占比',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{
        name: '待机时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#61D1FF"
            },
            {
              offset: 1,
              color: "#E436AA"
            }
            ], false), // 线条颜色
          },
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#61D1FF"
          },
          {
            offset: 1,
            color: "#E436AA"
          }
          ], false),
        },
        itemStyle: {
          color: "red",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(135, 54, 228, 1)"
            },
            {
              offset: 1,
              color: "rgba(97, 209, 255, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[3].stateRatio.Y1
      }, {
        name: '故障维修时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(228, 54, 170, 1)"
            },
            {
              offset: 1,
              color: "rgba(40, 107, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[3].stateRatio.Y2
      }, {
        name: '加工时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160, 54, 228, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(83, 132, 222, 1)"
            }, {
              offset: 1,
              color: "rgba(40, 182, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[3].stateRatio.Y3
      }]
    }
    setRightEchartsStateRatioFour(echartsListRight4);
    const echartsListLeft5 = {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: {
        data: data[4].dayOutput.X,
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3966EA',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: 16,
          },
          margin: 5, //刻度标签与轴线之间的距离。
        },

      },
      yAxis: [
        {
          name: '排产每日产量',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{ //三个最低下的圆片
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, 0],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#3966EA'
        },
        "data": data[4].dayOutput.X.map(item => {
          return item = 0.5;
        })
      },
      //下半截柱状图
      {
        name: '2020',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        itemStyle: { //lenged文本
          opacity: .7,
          color: '#2D529D'
        },

        data: data[4].dayOutput.Y
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（故障维修数）的value值 - 20
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: data[4].dayOutput.Y
      },

      {
        "name": "", //头部
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -3],
        "z": 12,
        "symbolPosition": "end",
        itemStyle: {
          color: '#163F7A',
          opacity: 1,
        },
        "data": data[4].dayOutput.Y
      },

      {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [15, 5],
        "symbolOffset": [0, -10],
        "z": 12,
        itemStyle: {
          opacity: 1,
          color: '#E567FF'
        },
        "symbolPosition": "end",
        data: data[4].dayOutput.Y
      },
      {
        name: '2019',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        z: 0,
        itemStyle: {
          color: '#163F7A',
          opacity: .7,
        },
        data: data[4].dayOutput.Y
      }
      ]
    }
    setRightEchartsDayOutputFive(echartsListLeft5);
    const echartsListRight5 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
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
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              }, {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
        }
      },
      legend: {
        align: "left",
        right: '0%',
        top: '0%',
        type: 'plain',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        // icon:'rect',
        itemGap: 25,
        itemWidth: 18,
        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

        data: [
          // {
          //     name: '上学'
          // },
          // {
          //     name: '到校'
          // },
          // {
          //     name: '放学'
          // }
        ]
      },
      grid: {
        top: '30%',
        left: '20%',
        right: '25%',
        bottom: '30%',
        // containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fffff',
            width: 2,
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fffff',
            padding: 16,
            fontSize: 14
          },
          formatter: function (data) {
            return data
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ''
          },
        },
        axisTick: {
          show: false,
        },
        data: data[4].stateRatio.X
      }],
      yAxis: [
        {
          name: '状态占比',
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 22,
            padding: 10
          },
          min: 0,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              padding: 16
            },
            formatter: function (value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false,
          },
        }],
      series: [{
        name: '待机时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#61D1FF"
            },
            {
              offset: 1,
              color: "#E436AA"
            }
            ], false), // 线条颜色
          },
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#61D1FF"
          },
          {
            offset: 1,
            color: "#E436AA"
          }
          ], false),
        },
        itemStyle: {
          color: "red",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(135, 54, 228, 1)"
            },
            {
              offset: 1,
              color: "rgba(97, 209, 255, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[4].stateRatio.Y1
      }, {
        name: '故障维修时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(228, 54, 170, 1)"
            },
            {
              offset: 1,
              color: "rgba(40, 107, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[4].stateRatio.Y2
      }, {
        name: '加工时间',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 0,
            color: "rgba(10,219,250,1)", // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: "rgba(10,219,250,1)",
          borderColor: "#646ace",
          borderWidth: 2

        },
        tooltip: {
          show: true
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160, 54, 228, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(83, 132, 222, 1)"
            }, {
              offset: 1,
              color: "rgba(40, 182, 240, 1)"
            }
            ], false),
            //shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: data[4].stateRatio.Y3
      }]
    }
    setRightEchartsStateRatioFive(echartsListRight5);
  }
  function getArrayValue(array, key) {
    var key = key || "value";
    var res = [];
    if (array) {
      array.forEach(function (t) {
        res.push(t[key]);
      });
    }
    console.log(res, 'arrName');
    return res;

  }

  function array2obj(array, key) {
    var resObj = {};
    for (var i = 0; i < array.length; i++) {
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }

  function getData(data) {
    var color = [
      ['rgba(41, 143, 255, 0.55)'],
      ['rgba(37, 121, 241, 1)'],
      ['rgba(255, 144, 35, 0.47)'],
      ['rgba(255, 144, 35, 1)'],
      ['rgba(41, 143, 255, 0.55)'],
    ];
    var radius = [
      {
        value1: '70%',
        value2: '80%',
      },
      {
        value1: '55%',
        value2: '65%',
      },
      {
        value1: '40%',
        value2: '50%',
      },
      {
        value1: '25%',
        value2: '35%',
      },
      {
        value1: '0%',
        value2: '20%',
      }
    ];
    var res = {
      series: [{
        name: '刻度线',
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        min: 0,
        max: 100,
        radius: '95%',
        center: ["50%", "50%"],
        title: { show: false },
        detail: { show: false },
        axisLine: {
          show: true,
        },
        axisTick: { length: 0, },
        splitLine: {
          length: '100%',
          show: true,
          lineStyle: {
            color: 'rgba(36, 143, 255, 1)',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: { show: false },
        pointer: { show: false, },
        data: [{ value: 0, }],
      }, {
        name: '刻度值',
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        min: 0,
        max: 100,
        radius: '100%',
        center: ["50%", "50%"],
        title: { show: false },
        detail: { show: false },
        axisLine: {
          show: false,
        },
        axisTick: { length: 0, },
        splitLine: { show: false, },
        axisLabel: {
          color: '#fffff',
          fontSize: 12,
          verticalAlign: 'top',
          align: 'left',
          margin: 0
        },
        pointer: { show: false, },
        data: [{ value: 0, }]
      }],
      legend: [],
    };
    for (let i = 0; i < data.length; i++) {
      // if (data[i].value < 60) {
      var itemColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: color[i][0] // 0% 处的颜色
        }, {
          offset: 1,
          color: color[i][0] // 100% 处的颜色
        }],
        global: false // 缺省为 false
      };
      // } 
      /* else {
          if (data[i].value < 80) {
              var itemColor = {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0,
                      color: color[1][0] // 0% 处的颜色
                  }, {
                      offset: 0.5,
                      color: color[1][1] // 100% 处的颜色
                  }, {
                      offset: 1,
                      color: color[1][1] // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              }
          } else {
              if (data[i].value < 100) {
                  var itemColor = {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0,
                          color: color[0][0] // 0% 处的颜色
                      }, {
                          offset: 2 / 3,
                          color: color[0][1] // 100% 处的颜色
                      }, {
                          offset: 1,
                          color: color[0][1] // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                  }
              }
          }
      } */
      res.series.push({
        name: '',
        startAngle: 0,
        endAngle: 450,
        type: 'pie',
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [radius[i].value1, radius[i].value2],
        center: ["50%", "50%"],
        label: {
          show: false
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          normal: {
            color: itemColor,
          }

        },
        data: [{
          value: data[i].value * 100,
          name: data[i].name
        }, {
          value: 400 / 3 - data[i].value * 100,
          name: '',
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }]
      });
      res.series.push({
        name: '',
        startAngle: 0,
        endAngle: 450,
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [radius[i].value1, radius[i].value2],
        center: ["50%", "50%"],
        label: {
          show: false
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          borderWidth: 5,
        },
        data: [{
          value: 7.5,
          itemStyle: {
            color: "#E3F0FF",
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }, {
          value: 2.5,
          name: '',
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }]
      });
    }
    return res;
  }
  const nan1 = {
    legend: [{
      show: true,
      top: '12%',
      left: "30%",
      data: arrName,
      width: 100,
      itemGap: 28,
      itemWidth: 0,
      icon: 'none',
      formatter: function (name) {
        return "{title|" + name + "}"
      },
      textStyle: {
        rich: {
          title: {
            fontSize: '12px',
            fontFamily: 'PingFang-SC-Bold-, PingFang-SC-Bold',
            fontWeight: 'normal',
            color: '#FFFFFF'
          },
          // value: {
          //   fontSize: '12px',
          //   fontFamily: 'PingFang-SC-Bold-, PingFang-SC-Bold',
          //   fontWeight: 'normal',
          //   color: '#FFFFFF'
          // }
        }
      },
    }],
    tooltip: {
      show: true,
      trigger: "item",
      confine: true,
      formatter: function (param) {
        return param.name + ' : ' + param.value + '%';
      },
      textStyle: {
        rich: {
          title: {
            fontSize: 20,
            lineHeight: 30,
            color: "#6D7383"
          },
          value: {
            fontSize: 18,
            lineHeight: 20,
            color: "#4DA1FF"
          }
        }
      },
    },
    series: optionData.series
  };
  var removeDuplicateDataDimensions = ['Index', '开始时间', '结束时间', '机床名称']
  function removeDuplicateData(arr) {
    for (var i = 0; i < arr.length; i++) {    // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {   // 再次遍历数组
        if (arr[i].machineName == arr[j].machineName) {          // 判断连个值是否相等
          arr[j].yValue = arr[i].yValue;
        }
      }
    }
    return arr
  }
  function removeDuplicateY1(arr) {
    for (var i = 0; i < arr.length; i++) {    // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {   // 再次遍历数组
        if (arr[i].machineName == arr[j].machineName) {          // 判断连个值是否相等
          arr.splice(j, 1);           // 相等删除后者
          j--;
        }
      }
    }
    return arr
  }
  function removeDuplicateY2(arr) {
    for (var i = 0; i < arr.length; i++) {    // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {   // 再次遍历数组
        if (arr[i].productName == arr[j].productName) {          // 判断连个值是否相等
          arr.splice(j, 1);           // 相等删除后者
          j--;
        }
      }
    }
    return arr
  }
  function removeDuplicateY3(arr) {
    //  console.log(arr,'arr-00000000000000000');
    for (var i = 0; i < arr.length; i++) {    // 首次遍历数组
      for (var j = i + 1; j < arr.length; j++) {   // 再次遍历数组
        if (arr[i].productName == arr[j].productName) {          // 判断连个值是否相等
          arr.splice(j, 1);           // 相等删除后者
          j--;
        }
      }
    }
    return arr
  }
  function makeOption(data1) {
    // const aaa=data1.find(item=>item.machineName=='清洗机');
    //   console.log(data1, 'aa清洗');
    return {
      tooltip: {},
      animation: false,
      toolbox: {//左侧编辑
        show: false,
        left: 20,
        top: 0,
        itemSize: 20,
        feature: {
          myDrag: {
            show: true,
            title: 'Make bars\ndraggable',
            icon: 'pafth://M990.55 380.08 q11.69 0 19.88 8.19 q7.02 7.01 7.02 18.71 l0 480.65 q-1.17 43.27 -29.83 71.93 q-28.65 28.65 -71.92 29.82 l-813.96 0 q-43.27 -1.17 -72.5 -30.41 q-28.07 -28.07 -29.24 -71.34 l0 -785.89 q1.17 -43.27 29.24 -72.5 q29.23 -29.24 72.5 -29.24 l522.76 0 q11.7 0 18.71 7.02 q8.19 8.18 8.19 18.71 q0 11.69 -7.6 19.29 q-7.6 7.61 -19.3 7.61 l-518.08 0 q-22.22 1.17 -37.42 16.37 q-15.2 15.2 -15.2 37.42 l0 775.37 q0 23.39 15.2 38.59 q15.2 15.2 37.42 15.2 l804.6 0 q22.22 0 37.43 -15.2 q15.2 -15.2 16.37 -38.59 l0 -474.81 q0 -11.7 7.02 -18.71 q8.18 -8.19 18.71 -8.19 l0 0 ZM493.52 723.91 l-170.74 -170.75 l509.89 -509.89 q23.39 -23.39 56.13 -21.05 q32.75 1.17 59.65 26.9 l47.94 47.95 q25.73 26.89 27.49 59.64 q1.75 32.75 -21.64 57.3 l-508.72 509.9 l0 0 ZM870.09 80.69 l-56.13 56.14 l94.72 95.9 l56.14 -57.31 q8.19 -9.35 8.19 -21.05 q-1.17 -12.86 -10.53 -22.22 l-47.95 -49.12 q-10.52 -9.35 -23.39 -9.35 q-11.69 -1.17 -21.05 7.01 l0 0 ZM867.75 272.49 l-93.56 -95.9 l-380.08 380.08 l94.73 94.73 l378.91 -378.91 l0 0 ZM322.78 553.16 l38.59 39.77 l-33.92 125.13 l125.14 -33.92 l38.59 38.6 l-191.79 52.62 q-5.85 1.17 -12.28 0 q-6.44 -1.17 -11.11 -5.84 q-4.68 -4.68 -5.85 -11.7 q-2.34 -5.85 0 -11.69 l52.63 -192.97 l0 0 Z',
            onclick: onDragSwitchClick
          }
        }
      },
      title: {
        show: false,
        text: 'Gantt of Airport Flight',
        left: 'center'
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
          showDetail: false
        },
        {
          type: 'inside',
          id: 'insideX',
          xAxisIndex: 0,
          filterMode: 'weakFilter',
          start: 0,
          end: 26,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true
        },
        {
          type: 'slider',
          yAxisIndex: 0,
          zoomLock: true,
          width: 10,
          right: 10,
          top: 70,
          bottom: 20,
          start: 95,
          end: 100,
          handleSize: 0,
          showDetail: false
        },
        {
          type: 'inside',
          id: 'insideY',
          yAxisIndex: 0,
          start: 95,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true
        }
      ],
      grid: {
        show: true,
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
        backgroundColor: 'transparent',
        borderWidth: 0
      },
      xAxis: [{
        type: 'category',
        position: 'bottom',
        splitLine: {
          lineStyle: {
            color: ['#E9EDFF']
          },
        },
        //data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: {
          show: false
        },
        axisTick: {
          lineStyle: {
            color: '#929ABA'
          }
        },
        axisLabel: {
          color: '#929ABA',
          inside: false,
          align: 'center',
        }
      }],
      yAxis: {
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        min: 0,
        max: _rawData.parkingApron.data.length
      },
      series: [
        {//内容值
          id: 'flightDataCenter',
          type: 'custom',
          renderItem: renderGanttItem,
          dimensions: removeDuplicateDataDimensions,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
          },
          // data: data1.map((item, index) => {
          //   return [index + 150].concat(item.startTime, item.endTime, item.machineName, item.currentColor);//左右颜色
          // })
          data: removeDuplicateData(data1).map((item, index) => {
            return [item.yValue + 315].concat(item.startTime, item.endTime, item.opName, item.opName, item.currentColor);//左右颜色
          })
        },
        {//y1轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY1,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0
          },
          // data: _rawData.parkingApron.data.map(function (item, index) {
          //   return [index].concat(item);
          // }),
          data: removeDuplicateY1(data1).map((item, index) => {
            return [index + 315].concat(item.machineName);
          })
        },
        {//y2轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY2,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0
          },
          data: removeDuplicateY2(data1).map((item, index) => {
            return [index + 318].concat(item.productName);
          })
        },
        {//y3轴值
          type: 'custom',
          renderItem: renderAxisLabelItemY3,
          dimensions: _rawData.parkingApron.dimensions,
          encode: {
            x: -1,
            y: 0
          },
          data: removeDuplicateY3(data1).map((item, index) => {
            return [index + 318].concat(item.currentColor);
          })
        }
      ]
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
    var text =
      barLength > flightNumberWidth + 40 && x + barLength >= 180
        ? flightNumber
        : '';
    // data1.map((item, index) => {
    var rectNormal = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: barHeight
    });
    var rectVIP = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength / 2,
      height: barHeight
    });
    var rectText = clipRectByRect(params, {
      x: x,
      y: y,
      width: barLength,
      height: barHeight
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
          })
        },
        {
          type: 'rect',
          ignore: !rectVIP && !api.value(5),
          shape: rectVIP,
          style: api.style({
            //左边颜色
            fill: api.value(5),
          })
        },
        {
          type: 'rect',
          ignore: !rectText,
          shape: rectText,
          style: api.style({
            fill: 'transparent',
            stroke: 'transparent',
            text: text,
            textFill: 'white'
          })
        }
      ]
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
            textFill: '#FFFFFF'
          }
        },
      ]
    };
  }
  function renderAxisLabelItemY2(params, api) {
    var y = api.coord([0, api.value(0)])[1];
    if (y < params.coordSys.y + 5) {
      return;
    }
    return {
      type: 'group',
      position: [2150, y],
      children: [
        {
          type: 'text',
          style: {
            x: 24,
            y: -3,
            text: api.value(1),
            textVerticalAlign: 'bottom',
            textAlign: 'center',
            textFill: '#FFFFFF'
          }
        },
      ]
    };
  }
  function renderAxisLabelItemY3(params, api) {
    var y = api.coord([0, api.value(0)])[1];
    if (y < params.coordSys.y + 5) {
      return;
    }
    return {
      type: 'group',
      position: [2120, y],
      children: [
        {
          type: 'rect',
          shape: {
            d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
            x: 0,
            y: -20,
            width: 20,
            height: 20,
            layout: 'cover'
          },
          style: {
            fill: api.value(1)
          }
        }
      ]
    };
  }
  function clipRectByRect(params, rect) {
    return echarts.graphic.clipRectByRect(rect, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
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
          disabled: _draggable
        },
        {
          id: 'insideY',
          disabled: _draggable
        }
      ]
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
        timeDeparture: param.value[DIM_TIME_DEPARTURE]
      };
      var style = {
        lineWidth: 2,
        fill: 'rgba(255,0,0,0.1)',
        stroke: 'rgba(255,0,0,0.8)',
        lineDash: [6, 3]
      };
      _draggingEl = addOrUpdateBar(_draggingEl, _draggingRecord, style, 100);
      _draggingCursorOffset = [
        _draggingEl.position[0] - param.event.offsetX,
        _draggingEl.position[1] - param.event.offsetY
      ];
      _draggingTimeLength =
        _draggingRecord.timeDeparture - _draggingRecord.timeArrival;
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
        _draggingCursorOffset[1] + cursorY
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
              data: _rawData.flight.data
            }
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
        itemData.categoryIndex
      ]);
      var pointDeparture = myChart.convertToPixel('grid', [
        itemData.timeDeparture,
        itemData.categoryIndex
      ]);
      var barLength = pointDeparture[0] - pointArrival[0];
      var barHeight =
        Math.abs(
          myChart.convertToPixel('grid', [0, 0])[1] -
          myChart.convertToPixel('grid', [0, 1])[1]
        ) * HEIGHT_RATIO;
      if (!el) {
        el = new echarts.graphic.Rect({
          shape: { x: 0, y: 0, width: 0, height: 0 },
          style: style,
          z: z
        });
        myChart.getZr().add(el);
      }
      el.attr({
        shape: { x: 0, y: 0, width: barLength, height: barHeight },
        position: [pointArrival[0], pointArrival[1] - barHeight]
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
          timeDeparture: cursorData[0] + _draggingTimeLength
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
          cursorDistY: cursorDistY
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
      prepareBatch(
        batch,
        'insideX',
        optionInsideX.start,
        optionInsideX.end,
        params.cursorDistX
      );
      prepareBatch(
        batch,
        'insideY',
        optionInsideY.start,
        optionInsideY.end,
        -params.cursorDistY
      );
      batch.length &&
        myChart.dispatchAction({
          type: 'dataZoom',
          batch: batch
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
          end: end
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
        }
      };
    }
  }
  return <div className='wrap'>
    <Row>
      <Col span={8}>
        <LeftTop />
        <LeftCenter
          materialDemandList={allData.materialDemandList}
          leftEchartsPieInfoOne={leftEchartsPieInfoOne}
          leftEchartsPieInfoTwo={leftEchartsPieInfoTwo}
          leftEchartsPieInfoThree={leftEchartsPieInfoThree}
          leftEchartsPieInfoFour={leftEchartsPieInfoFour}
          leftEchartsPieOne={leftEchartsPieOne}
          leftEchartsPieTwo={leftEchartsPieTwo}
          leftEchartsPieThree={leftEchartsPieThree}
          leftEchartsPieFour={leftEchartsPieFour} />
        <LeftBottom allData={allData} finishPlanObj={finishPlanObj} diffAlgorithmX={diffAlgorithmX} diffAlgorithmY={diffAlgorithmY} materialTypeSixList={materialTypeSixList} />
      </Col>
      <Col span={8} className='center-middle'>
        <div className='main-title'></div>
        <div className='digitization-title'>
          <div></div>
          <div>
            <p>数字化</p>
            <p>Digitzing</p>
          </div>
        </div>
        <div className='modernization-title'>
          <div></div>
          <div>
            <p>现代化</p>
            <p>MODERNIZATION</p>
          </div>
        </div>
        <div id='xuanzhun'>
        </div>
        <div className='left-mess'>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
        </div>
        <div className='right-mess'>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
        </div>
        <div id='main'>

        </div>
      </Col>
      <Col span={8}>
        <RightTop allData={allData} deviceUseTime={deviceUseTime} />
        <RightCenter nan1={nan1}
          fourWeekOutputStatistics={fourWeekOutputStatistics}
          fourWeekEnergyConsumption={fourWeekEnergyConsumption}
          fourWeekUseTrend={fourWeekUseTrend}
          fourWeekUtilizationRate={fourWeekUtilizationRate}
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
  </div>;
};

export default connect((state) => ({ /* allData: state.allData */ }), (dispatch) => ({
  getAllData: (payload) => dispatch({ type: 'page/getAllData', payload }),
})
)(Home)