import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Steps, Popover, Table, Tooltip } from 'antd';
const { Step } = Steps;
import './index.less';
import ReactEchartsCom from '../../components/ReactEcharts/index';
import Gantt from './gantt';
// 添加请求拦截器
import axios from 'axios';
import * as echarts from 'echarts';
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
  const {
    materialDemandList,
    leftEchart,
    outSideOrderDetail,
    outSideOrderDetailTimeList,
    currentTime,
  } = props;
  const [timer, setTimer] = useState(null);
  const timers = useRef(null);
  const [leftEchartCen, setLeftEchartCen] = useState([]);
  //const [timers, setTimers] = useState(null);
  // useEffect(() => {
  //   if (leftEchart.length) {
  //     // roll(100);
  //   }
  //   return () => {
  //     clearInterval(timers);
  //   };
  // }, [leftEchart]);
  useEffect(() => {
    if (leftEchart?.length) {
      init();
      const cenData = leftEchart.slice(0, 6).map((item, index) => {
        return {
          ...item,
          delay: 3 * (index + 1),
        };
      });
      setLeftEchartCen(cenData);
      leftEchartScroll(12000, cenData);
    }
    return init;
  }, [leftEchart]);
  const leftEchartScroll = (time, data) => {
    timers.current = setTimeout(() => {
      // const [newArr, currentIndex2] = loopData2(materialTypeLaterList, 1);
      // const newData = newArr.map((item, index) => {
      //   return {
      //     ...item,
      //     index: 1,
      //     delay: 2 * (currentIndex2 + 1),
      //   }
      // })
      // data.splice(currentIndex2, 1, newData[0]);
      setLeftEchartCen(
        loopData(leftEchart, 6).map((item, index) => {
          return {
            ...item,
            delay: 3 * (index + 1),
          };
        }),
      );
      // console.log(data, 'current-data')
      leftEchartScroll(12000, data);
    }, time);
  };
  const init = () => {
    timers?.current && clearTimeout(timers?.current);
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
  const checkTime = (i) => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  useEffect(() => {
    InitialScroll(materialDemandList);
    return () => {
      return clearInterval(timer);
    };
  }, [materialDemandList]);
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
      width: 100,
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
        <Col span={9}>
          <div className="plan-mark-total">
            <div className="plan-mark-title">
              <div className="jian-tou"></div>
              <span>计划号集合</span>
            </div>
            <Gantt orderDetail={outSideOrderDetail} />
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
        <Col span={5} push={2} className="mobile-card">
          <div id="review_box" className="review_box">
            <ul id="leftEchart1" className="leftEchart1">
              {leftEchartCen.map((item, index) => {
                return (
                  /*   className="run-lis" */
                  <li key={index} className="run-lis" style={{ animationDelay: item.delay + 's' }}>
                    <ReactEchartsCom option={item.leftEchartsPieOne} />
                    <div>
                      <ul className="steps-mess">
                        <li className="title">
                          <span>计划编号</span>
                          <Tooltip title={item.leftEchartsPieInfoOne.planNO}>
                            <span>{item.leftEchartsPieInfoOne.planNO}</span>
                          </Tooltip>
                        </li>
                        <li className="title">
                          <span>产品名称</span>
                          <Tooltip title={item.leftEchartsPieInfoOne.productName}>
                            <span>{item.leftEchartsPieInfoOne.productName}</span>
                          </Tooltip>
                        </li>
                        <li className="title">
                          <span>计划等级</span>
                          <span>{item.leftEchartsPieInfoOne.planLevel}</span>
                        </li>
                        <li className="title"></li>
                        <li className="title-button">
                          <span
                            className={
                              item.yijiagongCount != '0%' &&
                              item.yijiagongCount != '100%' &&
                              item.yijiagongCount != '100.0%'
                                ? 'active'
                                : ''
                            }
                          >
                            加工中
                          </span>
                          <span className={item.yijiagongCount == '0%' ? 'active' : ''}>
                            未加工
                          </span>
                          <span
                            className={
                              item.yijiagongCount == '100%' || item.yijiagongCount == '100.0%'
                                ? 'active'
                                : ''
                            }
                          >
                            已加工
                          </span>
                        </li>
                      </ul>
                      {/* <Steps
                        className="steps"
                        // current={item.leftEchartsPieInfoOneCurrent}
                        progressDot={customDotOne}
                      >
                        {item.baseicList.map((item) => {
                          return <Step title={item.name} description={item.value} status={item.status} />;
                        })}
                      </Steps> */}
                      {/* <ul className="steps-exceedList">
                        {item.exceedList.map((item, index) => {
                          return (
                            <li key={index} style={{ background: item.color }}>
                              <span>{item.title}</span>
                            </li>
                          );
                        })}
                      </ul> */}
                      <ul className="steps-schedualList">
                        {item.schedualList.map((item, index) => {
                          return (
                            <li key={index} style={{ background: item.color }}>
                              <span
                                style={{
                                  left:
                                    item.title == '排产开始和结束时间'
                                      ? '-71%'
                                      : item.title == '排产开始与结束时间'
                                      ? '-233%'
                                      : '-152%',
                                }}
                              >
                                {item.flag ? item.title : ''}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="steps-planList">
                        {item.planList.map((item, index) => {
                          return (
                            <li key={index} style={{ background: item.color }}>
                              <span
                                style={{
                                  left:
                                    item.title == '计划开始和结束时间'
                                      ? '-71%'
                                      : item.title == '计划开始与结束时间'
                                      ? '-233%'
                                      : '-152%',
                                }}
                              >
                                {item.flag ? item.title : ''}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="steps-baseicList">
                        {item.uiList.map((item, index) => {
                          return <li key={index} style={{ background: item.color }}></li>;
                        })}
                      </ul>
                      <ul className="steps-baseicList-date">
                        {item.uiList.map((item, index) => {
                          return (
                            <li key={index} style={{ display: item.flag ? 'block' : 'none' }}>
                              {' '}
                              {item.fakeValue}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
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
