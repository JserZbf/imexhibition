import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'
import ReactEchartsCom from '../../components/ReactEcharts/index'
import * as echarts from 'echarts'
const rightCenter = function (props) {
  const [fourAps, setFourAps] = useState({
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      show: true,
      left: 'center',
      bottom: 0,
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6'
      },
      data: ['设备一', '设备二', '设备三', '设备四']
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五'],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          symbol: ['none', 'triangle'], //只在末端显示箭头
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
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
          show: true
        },
        axisLabel: {
          color: '#fff'
        },
      }
    ],
    series: [
      {
        name: '设备一',
        type: 'bar',
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],
        itemStyle: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(60, 123, 253, 1)"
          },
          {
            offset: 1,
            color: "rgba(146, 182, 255, 0.39)"
          }
          ])
        },
      },
      {
        name: '设备二',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290],
        itemStyle: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(60, 176, 253, 1)"
          },
          {
            offset: 1,
            color: "rgba(146, 248, 255, 0.35)"
          }
          ])
        }
      },
      {
        name: '设备三',
        type: 'bar',
        //label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190],
        itemStyle: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(35, 122, 255, 1)"
          },
          {
            offset: 1,
            color: "rgba(13, 91, 210, 0.16)"
          }
          ])
        }
      },
      {
        name: '设备四',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40],
        itemStyle: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(253, 189, 60, 1)"
          },
          {
            offset: 1,
            color: "rgba(255, 208, 146, 0.24)"
          }
          ])
        }
      }
    ]
  })
  const [fourWeekPption, setFourWeekPption] = useState({
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
    legend: {
      show: true,
      x: '180',
      y: 'bottom',
      icon: 'rect',
      itemWidth: 25,
      itemHeight: 10,
      textStyle: {
        color: '#1bb4f6'
      },
      data: [{ name: '注册总量' }, { name: '注册总量2' }, { name: '注册总量3' }]
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      // containLabel: true
    },
    xAxis: [{
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'RGBA(17, 79, 100, 1)',
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
        lineStyle: {
          color: '#27b4c2'
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'RGBA(17, 76, 100, 1)'
        }
      }
    }],
    series: [{
      name: '注册总量',
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: "rgba(65, 155, 251, 1)",
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
        color: "#fff",
        borderColor: "rgba(65, 155, 251, 1)",
        borderWidth: 2,
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
            color: 'rgba(2, 134, 248, 1)'
          }, {
            offset: 1,
            color: 'rgba(0, 107, 255, 0.18)'
          }
          ], false),
          // shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 100
        }
      },
      data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02,]
    },
    {
      name: '注册总量2',
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: "rgba(30, 218, 247, 1)",
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
        color: "#fff",
        borderColor: "rgba(2, 191, 248, 1)",
        borderWidth: 2,
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
            color: 'rgba(2, 191, 248, 1)'
          }, {
            offset: 1,
            color: 'rgba(0, 185, 255, 0.18)'
          }
          ], false),
          // shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 100
        }
      },
      data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14,],
    },
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
          color: "#FE8B24",
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
        color: "#fff",
        borderColor: "#FE8B24",
        borderWidth: 2,
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
            color: 'rgba(255, 161, 19, 1)'
          }, {
            offset: 1,
            color: 'rgba(255, 145, 0, 0.18)'
          }
          ], false),
          // shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 100
        }
      },
      data: [201.55, 308.35, 104.02, 109.55, 119.57, 136.14,],
    },
    ]
  });
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
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      // containLabel: true
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
  const [returnAps, setReturnAps] = useState({
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#fff'
        },
      },

    ],
    yAxis: [
      {
        type: 'category',
        data: ['设备一', '设备二', '设备三', '设备四', '设备五', '设备六'],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          }
        },
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          barBorderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(0, 43, 183, 1)"
          },
          {
            offset: 1,
            color: "rgba(143, 198, 255, 1)"
          }
          ])
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {  // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20 
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: [100, 102, 81, 114, 70, 210, 190]
      },
      {
        name: '联盟广告',
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          barBorderRadius: [0, 10, 10, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(0, 85, 255, 1)"
          }, {
            offset: 0.5,
            color: "rgba(56, 117, 241, 1)"
          },
          {
            offset: 1,
            color: "rgba(55, 114, 237, 1)"
          }
          ])
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      }

    ]
  })
  const [aps, setAps] = useState({
    backgroundColor: '#001120',
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(68, 130, 255, 1)',
            width: 2,
          },
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#fff'
        },
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          barBorderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(0, 43, 183, 1)"
          },
          {
            offset: 1,
            color: "rgba(143, 198, 255, 1)"
          }
          ])
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {  // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20 
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          color: 'transparent'
        },
        data: [100, 102, 81, 114, 70, 210, 190]
      },
      {
        name: '联盟广告',
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        stack: '广告',
        itemStyle: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(0, 85, 255, 1)"
          }, {
            offset: 0.5,
            color: "rgba(56, 117, 241, 1)"
          },
          {
            offset: 1,
            color: "rgba(55, 114, 237, 1)"
          }
          ])
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      }

    ]
  })
  var data = [{
    name: "名称1",
    value: 100
  },
  {
    name: "名称2",
    value: 100
  },
  {
    name: "名称3",
    value: 100
  },
  {
    name: "名称4",
    value: 100
  }
  ];
  var color = [
    ['rgba(41, 143, 255, 0.55)'],
    ['rgba(37, 121, 241, 1)'],
    ['rgba(255, 144, 35, 0.47)'],
    ['rgba(255, 144, 35, 1)'],
  ];
  var arrName = getArrayValue(data, "name");
  var arrValue = getArrayValue(data, "value");
  var sumValue = eval(arrValue.join('+'));
  var objData = array2obj(data, "name");
  var optionData = getData(data)

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
    var res = {
      series: [],
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
        type: 'pie',
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [70 - i * 30 + '%', 65 - i * 15 + '%'],
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
          value: data[i].value,
          name: data[i].name
        }, {
          value: 400 / 3 - data[i].value,
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
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [70 - i * 30 + '%', 65 - i * 15 + '%'],
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
    console.log(res, 'res');
    return res;
  }
  optionData.series.push(
    {
      name: '刻度线',
      type: 'gauge',
      startAngle: 90,
      endAngle: 450,
      min: 0,
      max: 100,
      radius: '90%',
      center: ["50%", "50%"],
      title: { show: false },
      detail: { show: false },
      axisLine: {
        //length: '100%',
        show: false,

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
      show: true,
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
  });
  const [nan1, setNan1] = useState({
    legend: [{
      show: true,
      top: '15%',
      left: "50%",
      data: arrName,
      width: 100,
      itemGap: 48,
      itemWidth: 0,
      icon: 'none',
      formatter: function (name) {
        return "{title|" + name + "}{value| " + (objData[name].value / sumValue * 100).toFixed(2) + "%} "
      },
      textStyle: {
        rich: {
          title: {
            fontSize: '18px',
            fontFamily: 'PingFang-SC-Bold-, PingFang-SC-Bold',
            fontWeight: 'normal',
            color: '#FFFFFF'
          },
          value: {
            fontSize: '18px',
            fontFamily: 'PingFang-SC-Bold-, PingFang-SC-Bold',
            fontWeight: 'normal',
            color: '#FFFFFF'
          }
        }
      },
    }],
    tooltip: {
      show: true,
      trigger: "item",
      confine: true,
      formatter: function (param) {
        return param.name + ' : ' + param.value + ' ( ' + (objData[param.name].value / sumValue * 100).toFixed(2) + "% ）"
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
  })
  let xLabel = ['3.26', '3.27', '3.28', '3.29', '3.30', '3.31']
  let goToSchool = ["40", "60", "22", "85", "50", "40"]
  let goOutSchool = ["80", "85", "87", "90", "92", "96"]
  let startSchool = ["20", "50", "12", "65", "30", "60"]
  const [maintainList, setMaintainList] = useState([
    {
      'stateOf': {
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
          },
          formatter: (p) => {
            let dom = `<div style="width: 79px;
        height: 100px;;color:#fff;position: relative;">
            <svg style="position: absolute;top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
            <style>
              .cls-1 {
                fill: #07172c;
                fill-opacity: 0.8;
                stroke: #a7d8ff;
                stroke-linejoin: round;
                stroke-opacity: 0.2;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

            </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
            transform="translate(-258.5 -592.5)" />
        </svg>
            <div style="padding: 4px 8px 4px 14px;display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;position: relative;z-index: 1;">
                <div style="margin-bottom: 4px;width:100%;display:${p[0] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[0] ? p[0].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[0] ? p[0].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[1] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[1] ? p[1].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[1] ? p[1].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[2] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[2] ? p[2].seriesName : ''}</span>
                <span style="font-size:14px;color:#fff;">${p[2] ? p[2].data : ''}</span>
            </div>
            </div>
        </div>`
            return dom
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
          data: xLabel
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
          name: '上学',
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
          data: goToSchool
        }, {
          name: '到校',
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
          data: startSchool
        }, {
          name: '放学',
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
          data: goOutSchool
        }]
      },
      'production': {
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
          data: ["01-14", "01-15", "01-16", "01-17", "01-18", "01-19"],
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
          "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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

          data: [200, 100, 200, 200, 100, 123]
        },

        { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 15,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: [200, 100, 200, 200, 100, 123]
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
          "data": [300, 200, 300, 300, 400, 143]
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
          "data": [200, 100, 200, 200, 100, 123]
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
          data: [300, 200, 300, 300, 400, 143]
        }


        ]
      }
    },
    {
      'stateOf': {
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
          },
          formatter: (p) => {
            let dom = `<div style="width: 79px;
        height: 100px;;color:#fff;position: relative;">
            <svg style="position: absolute;top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
            <style>
              .cls-1 {
                fill: #07172c;
                fill-opacity: 0.8;
                stroke: #a7d8ff;
                stroke-linejoin: round;
                stroke-opacity: 0.2;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

            </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
            transform="translate(-258.5 -592.5)" />
        </svg>
            <div style="padding: 4px 8px 4px 14px;display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;position: relative;z-index: 1;">
                <div style="margin-bottom: 4px;width:100%;display:${p[0] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[0] ? p[0].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[0] ? p[0].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[1] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[1] ? p[1].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[1] ? p[1].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[2] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[2] ? p[2].seriesName : ''}</span>
                <span style="font-size:14px;color:#fff;">${p[2] ? p[2].data : ''}</span>
            </div>
            </div>
        </div>`
            return dom
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
          data: xLabel
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
          name: '上学',
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
          data: goToSchool
        }, {
          name: '到校',
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
          data: startSchool
        }, {
          name: '放学',
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
          data: goOutSchool
        }]
      },
      'production': {
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
          data: ["01-14", "01-15", "01-16", "01-17", "01-18", "01-19"],
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
          "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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

          data: [200, 100, 200, 200, 100, 123]
        },

        { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 15,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: [200, 100, 200, 200, 100, 123]
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
          "data": [300, 200, 300, 300, 400, 143]
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
          "data": [200, 100, 200, 200, 100, 123]
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
          data: [300, 200, 300, 300, 400, 143]
        }


        ]
      }
    },
    {
      'stateOf': {
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
          },
          formatter: (p) => {
            let dom = `<div style="width: 79px;
        height: 100px;;color:#fff;position: relative;">
            <svg style="position: absolute;top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
            <style>
              .cls-1 {
                fill: #07172c;
                fill-opacity: 0.8;
                stroke: #a7d8ff;
                stroke-linejoin: round;
                stroke-opacity: 0.2;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

            </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
            transform="translate(-258.5 -592.5)" />
        </svg>
            <div style="padding: 4px 8px 4px 14px;display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;position: relative;z-index: 1;">
                <div style="margin-bottom: 4px;width:100%;display:${p[0] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[0] ? p[0].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[0] ? p[0].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[1] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[1] ? p[1].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[1] ? p[1].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[2] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[2] ? p[2].seriesName : ''}</span>
                <span style="font-size:14px;color:#fff;">${p[2] ? p[2].data : ''}</span>
            </div>
            </div>
        </div>`
            return dom
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
          data: xLabel
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
          name: '上学',
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
          data: goToSchool
        }, {
          name: '到校',
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
          data: startSchool
        }, {
          name: '放学',
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
          data: goOutSchool
        }]
      },
      'production': {
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
          data: ["01-14", "01-15", "01-16", "01-17", "01-18", "01-19"],
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
          "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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

          data: [200, 100, 200, 200, 100, 123]
        },

        { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 15,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: [200, 100, 200, 200, 100, 123]
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
          "data": [300, 200, 300, 300, 400, 143]
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
          "data": [200, 100, 200, 200, 100, 123]
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
          data: [300, 200, 300, 300, 400, 143]
        }


        ]
      }
    },
    {
      'stateOf': {
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
          },
          formatter: (p) => {
            let dom = `<div style="width: 79px;
        height: 100px;;color:#fff;position: relative;">
            <svg style="position: absolute;top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
            <style>
              .cls-1 {
                fill: #07172c;
                fill-opacity: 0.8;
                stroke: #a7d8ff;
                stroke-linejoin: round;
                stroke-opacity: 0.2;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

            </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
            transform="translate(-258.5 -592.5)" />
        </svg>
            <div style="padding: 4px 8px 4px 14px;display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;position: relative;z-index: 1;">
                <div style="margin-bottom: 4px;width:100%;display:${p[0] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[0] ? p[0].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[0] ? p[0].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[1] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[1] ? p[1].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[1] ? p[1].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[2] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[2] ? p[2].seriesName : ''}</span>
                <span style="font-size:14px;color:#fff;">${p[2] ? p[2].data : ''}</span>
            </div>
            </div>
        </div>`
            return dom
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
          data: xLabel
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
          name: '上学',
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
          data: goToSchool
        }, {
          name: '到校',
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
          data: startSchool
        }, {
          name: '放学',
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
          data: goOutSchool
        }]
      },
      'production': {
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
          data: ["01-14", "01-15", "01-16", "01-17", "01-18", "01-19"],
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
          "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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

          data: [200, 100, 200, 200, 100, 123]
        },

        { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 15,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: [200, 100, 200, 200, 100, 123]
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
          "data": [300, 200, 300, 300, 400, 143]
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
          "data": [200, 100, 200, 200, 100, 123]
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
          data: [300, 200, 300, 300, 400, 143]
        }


        ]
      }
    },
    {
      'stateOf': {
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
          },
          formatter: (p) => {
            let dom = `<div style="width: 79px;
        height: 100px;;color:#fff;position: relative;">
            <svg style="position: absolute;top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
          <defs>
            <style>
              .cls-1 {
                fill: #07172c;
                fill-opacity: 0.8;
                stroke: #a7d8ff;
                stroke-linejoin: round;
                stroke-opacity: 0.2;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

            </style>
          </defs>
          <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
            transform="translate(-258.5 -592.5)" />
        </svg>
            <div style="padding: 4px 8px 4px 14px;display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;position: relative;z-index: 1;">
                <div style="margin-bottom: 4px;width:100%;display:${p[0] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[0] ? p[0].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[0] ? p[0].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[1] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                    <span style="font-size:14px;color:#7ec7ff;">${p[1] ? p[1].seriesName : ''}</span>
                    <span style="font-size:14px;color:#fff;">${p[1] ? p[1].data : ''}</span>
                </div>
                <div style="width:100%;height:100%;display:${p[2] ? 'flex' : 'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[2] ? p[2].seriesName : ''}</span>
                <span style="font-size:14px;color:#fff;">${p[2] ? p[2].data : ''}</span>
            </div>
            </div>
        </div>`
            return dom
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
          data: xLabel
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
          name: '上学',
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
          data: goToSchool
        }, {
          name: '到校',
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
          data: startSchool
        }, {
          name: '放学',
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
          data: goOutSchool
        }]
      },
      'production': {
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
          data: ["01-14", "01-15", "01-16", "01-17", "01-18", "01-19"],
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
          "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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

          data: [200, 100, 200, 200, 100, 123]
        },

        { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 15,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: [200, 100, 200, 200, 100, 123]
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
          "data": [300, 200, 300, 300, 400, 143]
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
          "data": [200, 100, 200, 200, 100, 123]
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
          data: [300, 200, 300, 300, 400, 143]
        }


        ]
      }
    }
  ])
  return <div className='right-center'>
    <Row>
      <Col span={8} className='right-center-part1'>
        {
          maintainList.map((item, index) => {
            return <div key={index} className='maintain-list'>
              <div className='maintain-back-list'>
                <p><span>设备名称</span><span></span></p>
                <p><span>排产周期内机床开动率：</span><span>加工时间/运行时间</span></p>
                <p><span>是否完成保养计划:</span><span>否</span></p>
              </div>
              <div>
                <ReactEchartsCom option={item.production} width={'340px'} height={'250px'} left={'290px'} top={'7px'} />
              </div>
              <div>
                <ReactEchartsCom option={item.stateOf} width={'340px'} height={'250px'} left={'6px'} top={'2px'} />
              </div>
            </div>
          })
        }
      </Col>
      <Col span={5} className='right-center-part2'>
        <div className='right-center-title'>最近四周趋势对比图</div>
        <div className='right-center-mess'>APS排产方案较前四周大幅度提高计划完成率</div>
        <div className='right-center-mess-line'></div>
        <ReactEchartsCom option={nan1} width={'520px'} height={'520px'} left={'13px'} top={'68px'} />
        <div className='right-center-mess diff-kind'>APS系统可适应不同加工类型</div>
        <div className='right-center-mess-line'></div>
        <ReactEchartsCom option={aps} width={'650px'} height={'327px'} left={'0px'} top={'0px'} />
      </Col>
      <Col span={5} className='right-center-part3'>
        <div className='right-center-title'>近四周总设备利用率变化趋势图</div>
        <div className='right-center-mess'>APS系统增高机床开动率,降低机床待机率, 可通过监控机床维修率安排机床保养</div>
        <div className='right-center-mess-line'></div>
        <ReactEchartsCom option={fourWeekPption} width={'650px'} height={'327px'} left={'0px'} top={'66px'} />
        <div className='right-center-title diff-cond'>预计设备不同状态</div>
        <div className='right-center-mess'>可有效观察能耗分布,协助降低能耗大户</div>
        <div className='right-center-mess-line'></div>
        <ReactEchartsCom option={returnAps} width={'650px'} height={'327px'} left={'0px'} top={'0px'} />
      </Col>
      <Col span={6} className='right-center-part4'>
        <div className='right-center-title'>最近四周使用率趋势图</div>
        <div className='right-center-mess'>APS算法强化机床使用率均衡，减弱加工瓶颈</div>
        <div className='right-center-mess-line'></div>
        <ReactEchartsCom option={fourAps} width={'775px'} height={'577px'} left={'-58px'} top={'0px'} />
      </Col>
    </Row>
  </div>

};

export default connect()(rightCenter)