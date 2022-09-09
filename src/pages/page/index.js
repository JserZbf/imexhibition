import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { Table, DatePicker, InputNumber, message, Spin, Tooltip } from 'antd';
import moment from 'moment';
import './index.less';
import { getOrderData, getEditStart, getRescheduling } from 'services/home/home';
import AutoScale from '@/components/AutoScale';
import LeftModal from './Modal/leftModal';
import RightModal from './Modal/RightModal';
const Home = function ({ scale }) {
  const dateFormat = 'YYYY-MM-DD';
  // const [value, setValue] = useState(1);
  const [modalFlagLeft, setModalFlagLeft] = useState(false);
  const [modalFlagRight, setModalFlagRight] = useState(false);
  const [moniList, setMoniList] = useState([
    {
      name: '模拟场景1',
      value: '机加',
      flag: false,
    },
    {
      name: '模拟场景2',
      value: '机加带保养',
      flag: true,
    },
    {
      name: '模拟场景3',
      value: '智能优化',
      flag: false,
    },
  ]);
  const [rightInfoList, setRightInfoList] = useState([
    {
      name: '排产周期',
      value: '7日',
    },
    {
      name: '班次信息',
      value: '两班',
    },
  ]);
  const [leftInfoList, setLeftInfoList] = useState([
    {
      name: '',
      value: '最快交付',
      flag: false,
    },
    {
      name: '',
      value: '设备均衡',
      flag: true,
    },
  ]);
  const [overallFlag, setOverallFlag] = useState(false);
  const [rescheduleDetail, setRescheduleDetail] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [reset, setReset] = useState(false);
  const [spinMess, setSpinMess] = useState('排产中,请稍后...')
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => {
        return index + 1;
      },
      width: '100',
    },
    {
      title: '计划编号',
      dataIndex: 'planNO',
      key: 'planNO',
    },
    {
      title: <Tooltip title="可选0,1,2,3">计划等级</Tooltip>,
      dataIndex: 'planLevel',
      key: 'planLevel',
      render: (text, record, index) => {
        return (
          <InputNumber
            min={0}
            max={3}
            controls={false}
            disabled={overallFlag}
            value={record['planLevel']}
            style={{ width: '50px' }}
            onChange={(e) => {
              const newData = [...dataSource];
              record['planLevel'] = e;
              newData[index] = record;
              setDataSource(newData);
            }}
          />
        );
      },
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '加工数量',
      dataIndex: 'productNum',
      key: 'productNum',
      width:100,
    },
    {
      title: '计划开始时间',
      dataIndex: 'planStart',
      key: 'planStart',
      render: (text, record, index) => {
        return (
          <DatePicker
            defaultValue={moment(record.planStart, dateFormat)}
            disabled={overallFlag}
            format={dateFormat}
            style={{ width: '200px' }}
            onChange={(date, dateString) => {
              const newData = [...dataSource];
              record['planStart'] = dateString;
              newData[index] = record;
              setDataSource(newData);
            }}
            onFocus={() => {
              document.activeElement.blur();
            }}
          />
        );
      },
    },
    {
      title: '计划结束时间',
      dataIndex: 'planEnd',
      key: 'planEnd',
      render: (text, record, index) => {
        return (
          <DatePicker
            defaultValue={moment(record.planEnd, dateFormat)}
            disabled={overallFlag}
            format={dateFormat}
            style={{ width: '200px' }}
            onChange={(date, dateString) => {
              const newData = [...dataSource];
              record['planEnd'] = dateString;
              newData[index] = record;
              setDataSource(newData);
            }}
            onFocus={() => {
              document.activeElement.blur();
            }}
          />
        );
      }
    },
  ];
  const talbeData = [
    {
      key: '1',
      name: 'John Brown1',
      age: '模拟场景1-1',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      flag: 1,
    },
    {
      key: '2',
      name: 'Jim Green1',
      age: '模拟场景1-2',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 1,
    },
    {
      key: '3',
      name: 'Joe Black1',
      age: '模拟场景1-3',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 1,
    },
    {
      key: '10',
      name: 'Jim Green1',
      age: '模拟场景1-2',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 1,
    },
    {
      key: '11',
      name: 'Joe Black1',
      age: '模拟场景1-3',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 1,
    },
    {
      key: '12',
      name: 'Jim Green1',
      age: '模拟场景1-2',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 1,
    },
    {
      key: '13',
      name: 'Joe Black1',
      age: '模拟场景1-3',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 1,
    },
    {
      key: '14',
      name: 'Jim Green1',
      age: '模拟场景1-2',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 1,
    },
    {
      key: '15',
      name: 'Joe Black1',
      age: '模拟场景1-3',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 1,
    },
    {
      key: '4',
      name: 'John Brown12',
      age: '模拟场景1-4',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      flag: 2,
    },
    {
      key: '5',
      name: 'Jim Green12',
      age: '模拟场景2-1',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 2,
    },
    {
      key: '6',
      name: 'Joe Black12',
      age: '模拟场景2-2',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 2,
    },
    {
      key: '7',
      name: 'John Brown13',
      age: '模拟场景2-3',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      flag: 3,
    },
    {
      key: '8',
      name: 'Jim Green13',
      age: '模拟场景2-4',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      flag: 3,
    },
    {
      key: '9',
      name: 'Joe Black13',
      age: '模拟场景2-5',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      flag: 3,
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [fixList, setFixList] = useState([
    { name: '四小时', flag: false, value: 40 },
    { name: '二十四小时', flag: false, value: 240 },
  ]);
  const [taskId, setTaskId] = useState(93578990);
  const [schedulePattern, setSchedulePattern] = useState(2); //排产模拟场景
  const [scheduleCycle, setScheduleCycle] = useState(7); //排产周期
  const [scheduleTarget, setScheduleTarget] = useState(1); //排产目标
  const [spinFlag, setSpinFlag] = useState(false);
  const clickMoni = (name) => {
    setModalFlagLeft(false);
    setModalFlagRight(false);
    const cenData = moniList;
    const cen = cenData.map((item) => {
      if (item.name == name) {
        return {
          ...item,
          flag: true,
        };
      } else {
        return {
          ...item,
          flag: false,
        };
      }
    });
    setMoniList(cen);
    var cenSchedulePattern = null;
    if (name == '模拟场景1') {
      cenSchedulePattern = 0;
      setSpinMess('排产中,请稍后...');
    } else if (name == '模拟场景2') {
      cenSchedulePattern = 1;
      setSpinMess('排产中,请稍后...');
    } else if (name == '模拟场景3') {
      cenSchedulePattern = 2;
      setSpinMess('智能算法计算时间较长，请耐心等待...');
    }
    setSchedulePattern(cenSchedulePattern);
    const obj = {
      schedulePattern: cenSchedulePattern,
      scheduleCycle: scheduleCycle,
      scheduleTarget: scheduleTarget,
    };
    getOrderData(obj).then((res) => {
      if (res.code == 200) {
        setDataSource(res.orderDetail);
      }
    });
  };
  const clickLeftInfo = (name) => {
    var cenScheduleTarget = null;
    if (name == '最快交付') {
      cenScheduleTarget = 2;
    } else if (name == '设备均衡') {
      cenScheduleTarget = 1;
    }
    setScheduleTarget(cenScheduleTarget);
    const obj = {
      schedulePattern: schedulePattern,
      scheduleCycle: scheduleCycle,
      scheduleTarget: cenScheduleTarget,
    };
    getOrderData(obj).then((res) => {
      if (res.code == 200) {
        setDataSource(res.orderDetail);
      }
    });
    const cenData = leftInfoList;
    const cen = cenData.map((item) => {
      if (item.value == name) {
        return {
          ...item,
          flag: true,
        };
      } else {
        return {
          ...item,
          flag: false,
        };
      }
    });
    setLeftInfoList(cen);
  };
  const clickFix = (name) => {
    const cenFixList = fixList;
    const cen = cenFixList.map((item) => {
      if (item.name == name) {
        return {
          ...item,
          flag: true,
        };
      } else {
        return {
          ...item,
          flag: false,
        };
      }
    });
    setFixList(cen);
    setReset(true)
  };
  const clickMoal = () => {
    setModalFlagLeft(true);
    setModalFlagRight(true);
  };
  const productionStart = () => {
    setModalFlagLeft(false);
    setModalFlagRight(false);
    setOverallFlag(true);
    setSpinFlag(true);
    var objStart = {
      taskId: taskId + '',
      scheduleTarget: scheduleTarget,
      schedulePattern: schedulePattern,
      scheduleCycle: scheduleCycle,
      orderDetail: dataSource,
    };
    getEditStart(objStart)
      .then((res) => {
        setOverallFlag(false);
        setSpinFlag(false);
        if (res.code == 200) {
          setRescheduleDetail(res.orderScheduleDetail);
          setOrderDetail(res.orderDetail);
          message.success({
            content: '排产完成,请在大屏观看排产结果!',
            style: {
              marginTop: '20vh',
              fontSize: 22,
              fontFamily: 'PingFang SC-Regular, PingFang SC',
            },
          });
        } else {
          message.warn({
            content: '排产失败!',
            style: {
              fontSize: 22,
              marginTop: '20vh',
              fontFamily: 'PingFang SC-Regular, PingFang SC',
            },
          });
        }
      })
      .catch((err) => {
        setOverallFlag(false);
        setSpinFlag(false);
      });
  };
  const startRest = () => {
    setSpinMess('排产中,请稍后...');
    var fixValue = fixList.filter((item) => item.flag);
    if (rescheduleDetail.length == 0 || orderDetail.length == 0) {
      return message.warn({
        content: '请先点击排产开始!',
        style: {
          fontSize: 22,
          marginTop: '20vh',
          fontFamily: 'PingFang SC-Regular, PingFang SC',
        },
      });
    }
    if (!modalFlagLeft) {
      return message.warn({
        content: '请先选择故障设备!',
        style: {
          fontSize: 22,
          marginTop: '20vh',
          fontFamily: 'PingFang SC-Regular, PingFang SC',
        },
      });
    }
    if (modalFlagLeft && fixValue.length == 0) {
      return message.warn({
        content: '请先选择预计维修时间!',
        style: {
          fontSize: 22,
          marginTop: '20vh',
          fontFamily: 'PingFang SC-Regular, PingFang SC',
        },
      });
    }
    setModalFlagLeft(false);
    setModalFlagRight(false);
    setSpinFlag(true);
    setOverallFlag(true);
    const obj = {
      taskId: taskId,
      scheduleTarget: scheduleTarget,
      scheduleCycle: scheduleCycle,
      orderDetail: orderDetail.map((item, index) => {
        return {
          planNO: item.planNO,
          productName: item.productName,
          productNum: item.productNum,
          planType: item.planType,
          planLevel: item.planLevel,
          planStart: item.planStart,
          planEnd: item.planEnd,
        };
      }),
      rescheduleDetail: rescheduleDetail.map((item, index) => {
        return {
          ...item,
          state: 2,
        };
      }),
      faultyMachine: {
        '海科特-1': fixValue[0].value,
      },
    };
    getRescheduling(obj)
      .then((res) => {
        setSpinFlag(false);
        setOverallFlag(false);
        setReset(false);
        const cenFixList = fixList;
        const cen = cenFixList.map((item) => {
          return {
            ...item,
            flag: false
          }
        });
        setFixList(cen);
        if (res.code == 200) {
          message.success({
            content: '重排完成,请在大屏观看排产结果!',
            style: {
              marginTop: '20vh',
              fontSize: 22,
              fontFamily: 'PingFang SC-Regular, PingFang SC',
            },
          });
        } else {
          message.warn({
            content: '重排失败!',
            style: {
              fontSize: 22,
              marginTop: '20vh',
              fontFamily: 'PingFang SC-Regular, PingFang SC',
            },
          });
        }
      })
      .catch((err) => {
        setOverallFlag(false);
        setSpinFlag(false);
        setReset(false);
        const cenFixList = fixList;
        const cen = cenFixList.map((item) => {
          return {
            ...item,
            flag: false
          }
        });
        setFixList(cen);
      });
  };
  // useMemo(() => {
  //   const cen = talbeData.filter(item => value === item.flag);
  //   setDataSource(cen);
  //   setModalFlag(false)
  // }, [value])
  const loadData = async () => {
    //   console.log(schedulePattern, 'schedulePattern-schedulePattern');
    const obj = {
      schedulePattern: schedulePattern,
      scheduleCycle: scheduleCycle,
      scheduleTarget: scheduleTarget,
    };
    await getOrderData(obj).then((res) => {
      if (res.code == 200) {
        setDataSource(res.orderDetail);
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const closeModalLeft = () => {
    setModalFlagLeft(false);
  };
  const closeModalRight = () => {
    setModalFlagRight(false);
  };
  return (
    <div className="wrap">
      <Spin tip={spinMess} size="large" spinning={spinFlag} wrapperClassName="spin">
        <div className="main">
          <p className="total-title"></p>
          <div className="one-top">
            <ul className="left-info">
              {leftInfoList.map((item) => {
                return (
                  <li
                    key={item.value}
                    onClick={() => clickLeftInfo(item.value)}
                  >
                    <span style={{ color: item.flag ? '#ACDEFF' : '#AAAAAA' }}>{item.value}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mid-info">
              {moniList.map((item) => {
                const isActive = item.flag;
                return (
                  <div
                    key={item.name}
                    className={isActive ? 'item active' : 'item'}
                    onClick={() => {
                      clickMoni(item.name);
                    }}
                  >
                    <div className="scene">{item.name}</div>
                    <div className="desc">{item.value}</div>
                  </div>
                );
              })}
            </div>
            <div className="right-info">
              {rightInfoList.map((item) => {
                return (
                  <div key={item.name} className="params">
                    <span className="label">{item.name}</span>
                    <span className="value">{item.value}</span>
                  </div>
                );
              })}
            </div>
            <div
              className="start-btn"
              onClick={() => {
                productionStart();
              }}
            >
              排产开始
            </div>
          </div>
          <div className="two-center">
            <div className="table-data">
              <Table
                size="small"
                id="cyclicScroll"
                className="table-material"
                columns={columns}
                scroll={{ x: 'max-content', y: 180 }}
                dataSource={dataSource}
                pagination={false}
                rowKey="planNO"
              />
            </div>
            <div className="workshop-mess">
              <div>车间俯视图</div>
              <div>点击模拟设备故障</div>
            </div>
            <div
              className="workshop-pic"
              onClick={(e) => {
                e.stopPropagation();
                const {
                  target: { className },
                } = e;
                if (className === 'workshop-pic') {
                  clickMoal();
                }
              }}
            >
              <LeftModal
                fixList={fixList}
                modalFlagLeft={modalFlagLeft}
                clickFix={clickFix}
                closeModalLeft={closeModalLeft}
              />
              <RightModal modalFlagRight={modalFlagRight} closeModalRight={closeModalRight} />
            </div>
          </div>
          <div className="three-bottom">
            <div
              onClick={() => {
                startRest();
              }}
            ></div>
            <p style={{ display: reset ? 'block' : 'none' }}>点击开始重排</p>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default connect()(AutoScale(Home));
// export default connect((state) => ({ /* allData: state.allData */ }), (dispatch) => ({
//   getOrderData: (payload) => dispatch({ type: 'page/getOrderData', payload }),
// })
// )(Home)
