import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'dva';
import { Table, DatePicker, InputNumber,message} from 'antd';
import moment from 'moment';
import './index.less'
import { getOrderData, getEditStart } from 'services/home/home';
const Home = function (props) {
  const dateFormat = 'YYYY-MM-DD';
  // const [value, setValue] = useState(1);
  const [modalFlag, setModalFlag] = useState(false);
  const [moniList, setMoniList] = useState([{
    name: '模拟场景1',
    value: '物料未到位',
    flag: false,
  }, {
    name: '模拟场景2',
    value: '机床保养任务',
    flag: false,
  }, {
    name: '模拟场景3',
    value: '使用智能算法优化',
    flag: true,
  }])
  const [rightInfoList, setRightInfoList] = useState([{
    name: '排产周期',
    value: '7日'
  }, {
    name: '班次信息',
    value: '两班'
  }])
  const [leftInfoList, setLeftInfoList] = useState([{
    name: '',
    value: '最快交付',
    flag: false
  }, {
    name: '',
    value: '设备均衡',
    flag: true,
  }])
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => {
        return index + 1;
      },
      width:20
    },
    {
      title: '计划编号',
      dataIndex: 'planNO',
      key: 'planNO',
      width:20
    },
    {
      title: '计划等级（可选1,2,3）',
      dataIndex: 'planLevel',
      key: 'planLevel',
      render: (text, record, index) => {
        return <InputNumber min={0} max={3} value={record['planLevel']}
          onChange={(e) => {
            const newData = [...dataSource];
            record['planLevel'] = e;
            newData[index] = record;
            setDataSource(newData);
          }}
        />
      },
      width:100
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width:100
    },
    {
      title: '加工数量',
      dataIndex: 'productNum',
      key: 'productNum',
      width:100
    },
    {
      title: '计划开始时间（可选）',
      dataIndex: 'planStart',
      key: 'planStart',
      render: (text, record, index) => {
        return <DatePicker defaultValue={moment(record.planStart, dateFormat)} format={dateFormat}
          onChange={(date, dateString) => {
            const newData = [...dataSource];
            record['planStart'] = dateString;
            newData[index] = record;
            setDataSource(newData);
          }} />
      },
      width:100
    },
    {
      title: '计划结束时间（可选）',
      dataIndex: 'planEnd',
      key: 'planEnd',
      render: (text, record, index) => {
        return <DatePicker defaultValue={moment(record.planEnd, dateFormat)} format={dateFormat}
          onChange={(date, dateString) => {
            const newData = [...dataSource];
            record['planEnd'] = dateString;
            newData[index] = record;
            setDataSource(newData);
          }}
        />
      },
      width:100
    }
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
    }
  ];
  const [dataSource, setDataSource] = useState([]);
  const [taskId, setTaskId] = useState(93578990)
  const [schedulePattern, setSchedulePattern] = useState(2);//排产模拟场景
  const [scheduleCycle, setScheduleCycle] = useState(7);//排产周期
  const [scheduleTarget, setScheduleTarget] = useState(1);//排产目标
  const clickMoni = (name) => {
    const cenData = moniList
    const cen = cenData.map(item => {
      if (item.name == name) {
        return {
          ...item,
          flag: true
        }
      } else {
        return {
          ...item,
          flag: false
        }
      }
    })
    setMoniList(cen);
    var cenSchedulePattern = null;
    if (name == '模拟场景1') {
      cenSchedulePattern = 0;
    } else if (name == '模拟场景2') {
      cenSchedulePattern = 1;
    } else if (name == '模拟场景3') {
      cenSchedulePattern = 2;
    }
    setSchedulePattern(cenSchedulePattern);
    const obj = {
      "schedulePattern": cenSchedulePattern,
      "scheduleCycle": scheduleCycle,
      "scheduleTarget": scheduleTarget
    }
    getOrderData(obj).then(res => {
      if (res.code == 200) {
        setDataSource(res.orderDetail.map((item, index) => {
          return {
            ...item,
            index: index
          }
        }))
      }
    })
  }
  const clickLeftInfo = (name) => {
    var cenScheduleTarget = null;
    if (name == '最快交付') {
      cenScheduleTarget = 2;
    } else if (name == '设备均衡') {
      cenScheduleTarget = 1;
    }
    setScheduleTarget(cenScheduleTarget)
    const obj = {
      "schedulePattern": schedulePattern,
      "scheduleCycle": scheduleCycle,
      "scheduleTarget": cenScheduleTarget
    }
    getOrderData(obj).then(res => {
      if (res.code == 200) {
        setDataSource(res.orderDetail.map((item, index) => {
          return {
            ...item,
            index: index
          }
        }))
      }
    })
    const cenData = leftInfoList;
    const cen = cenData.map(item => {
      if (item.value == name) {
        return {
          ...item,
          flag: true
        }
      } else {
        return {
          ...item,
          flag: false
        }
      }
    })
    setLeftInfoList(cen);
  }

  const clickMoal = () => {
    setModalFlag(false);
  }
  const productionStart = () => {
    var objStart = {
      "taskId": taskId + '',
      "scheduleTarget": scheduleTarget,
      "schedulePattern": schedulePattern,
      "scheduleCycle": scheduleCycle,
      "orderDetail": dataSource
    }
    // const cenObjStart = JSON.stringify(objStart);
    // const url = encodeURI(encodeURI(`http://192.168.0.103:8001/page?obj=${cenObjStart}`));
    // window.open(url, '_self')
    getEditStart(objStart).then(res => {
      if (res.code == 200) {
        message.success('排产开始成功')
      }else{
        message.warn('排产开始失败')
      }
    })
  }
  // useMemo(() => {
  //   const cen = talbeData.filter(item => value === item.flag);
  //   setDataSource(cen);
  //   setModalFlag(false)
  // }, [value])
  const loadData = async () => {
    //   console.log(schedulePattern, 'schedulePattern-schedulePattern');
    const obj = {
      "schedulePattern": schedulePattern,
      "scheduleCycle": scheduleCycle,
      "scheduleTarget": scheduleTarget
    }
    await getOrderData(obj).then(res => {
      if (res.code == 200) {
        setDataSource(res.orderDetail.map((item, index) => {
          return {
            ...item,
            index: index
          }
        }))
      }
    })
  }
  useEffect(() => {
    loadData();
  }, [])
  return <div className='wrap'>
    <p className='total-title'></p>
    <div className='one-top'>
      <ul className='left-info'>
        {
          leftInfoList.map((item, index) => {
            return <li key={index} className={index == 0 ? item.flag ? 'fastest-active' : 'fastest-normal' : item.flag ? 'facility-active' : 'facility-normal'} onClick={() => { clickLeftInfo(item.value) }}>
            </li>
          })
        }
      </ul>
      <ul className='moni-list' >
        {
          moniList.map((item, index) => {
            return <li key={index} className={item.flag ? 'li-active' : 'li'} onClick={() => { clickMoni(item.name) }}>
              <span>{item.name}</span>
              <span>{item.value}</span>
            </li>
          })
        }
      </ul>
      <div className='right-info'>
        <ul>
          {
            rightInfoList.map((item, index) => {
              return <li key={index}>
                <span>{item.name}</span>
                <span>{item.value}</span>
              </li>
            })
          }
        </ul>
        <div onClick={() => { productionStart() }}>排产开始</div>
      </div>
    </div>
    <div className='two-center'>
      <div className='table-data'>
        {/* <Table
          className='table-material'
          rowClassName={tableClassName}
          columns={columns}
          scroll={{ x: 'max-content', y: 680 }}
          pagination={false}
          dataSource={dataSource} /> */}
        <Table id="cyclicScroll" className='table-material' columns={columns} scroll={{ x: 'max-content', y: 181 }} dataSource={dataSource} pagination={false} />

      </div>
      <div className='workshop-mess'>
        <p>车间俯视图</p>
        <p>点击设备模拟</p>
      </div>
      <div className='workshop-pic' onClick={() => {
        clickMoal();
      }}>
        {
          modalFlag ? <div><div className='left-modal'>
            <div>
              <p><span>[设备报警]</span><span>海科特#1</span></p>
              <p><span>故障类型:</span><span>切削液惨漏</span></p>
            </div>
            <div>
              <div>
                <p>故障详情:</p>
                <p>订单1008647828/13D配油盘OP010中断</p>
              </div>
              <div>
                <p>故障时间:</p>
                <p>2020-01-04  2:00 p.m.v</p>
              </div>
            </div>
            <div>
              <div>
                <p>预计维修时间</p>
                <p>
                  <span>四小时</span>
                  <span>二十四小时</span>
                </p>
              </div>
              <div>
                <p>备注</p>
                <p>123123</p>
              </div>
            </div>
            <div>
            </div>
          </div> <div className='right-modal'>
              <p><span>设备详情</span><span>切削液参漏</span></p>
              <p><span>推荐维修方案</span><span>切削液参漏</span></p>
              <p><span>推荐维修记录</span><span>切削液参漏</span></p>
              <p><span>备件型号与库存</span><span>切削液参漏</span></p>
              <p><span>设备电气图纸</span><span>切削液参漏</span></p>
            </div></div> : ''
        }
      </div>
    </div>
    <div className='three-bottom'>
      <div></div>
      <p>开始重排</p>
    </div>
  </div>;
};

export default connect()(Home)
// export default connect((state) => ({ /* allData: state.allData */ }), (dispatch) => ({
//   getOrderData: (payload) => dispatch({ type: 'page/getOrderData', payload }),
// })
// )(Home)
