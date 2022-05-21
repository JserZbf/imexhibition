import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'
const leftBottom = function (props) {
  const [materialList, setMaterialList] = useState([
    {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }, {
      number: "缺口数量",
      startTime: '最晚到达时间',
      time: '2022/5/20'
    }
  ]);
  const [finishPlanList, setFinishPlanList] = useState([{
    title: "预计交付计划数",
    value: 8,

  }, {
    title: "预计延迟计划数",
    value: 8,
  }, {
    title: "预计提前计划数",
    value: 8,
  },])
  const [order, setOrder] = useState([
    {
      title: '排产订单号',
      value: '10086117818'
    },
    {
      title: '选用排产算法',
      value: 'EDD或其他'
    }, {
      title: '是否有保养任务',
      value: '否'
    },
    {
      title: '排产目标',
      value: '设备使用均衡'
    }
  ])
  return <div className='left-bottom'>
    <Row>
      <Col span={14}>

        <ul className='material-type-list'>
          {
            materialList.map((item, index) => {
              return <li key={index}>
                <p className='title'>物料类型</p>
                <p className='number'>
                  <span>{item.number}</span>
                  <span></span>
                </p>
                <p className='start-time'>
                  <span>{item.startTime}</span>
                  <span></span>
                </p>
                <p className='time'>{item.time}</p>
              </li>
            })
          }
        </ul>
        <div className='left-bottom-order'>
          <div className='left-bottom-order-infor'>
            <div className='jian-tou'></div>
            <span>订单算法基础信息</span>
          </div>
          <div className='left-bottom-order-split'>

          </div>
          <div className='left-bottom-order-list'>
            <ul>
              {
                order.map((item, index) => {
                  return <li key={index}>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                  </li>
                })
              }
            </ul>
          </div>
        </div>;
      </Col>
      <Col span={5}>
        <div className='plan-finish-title'>
          计划完成率相关信息
        </div>
        <div className='plan-finish-infor'>
          {
            finishPlanList.map((item, index) => {
              return <dl key={index}>
                <dt></dt>
                <dd>
                  <p>{item.title}</p>
                  <p>{item.value}</p>
                </dd>
              </dl>
            })
          }
        </div>
        <div className='yield-rate'>
            
        </div>
      </Col>
      <Col span={5}>
        <div className='diff-infor-title'>
          <p>不同算法对比信息</p>
          <p>增加5种分派规则设备利用率生成对比</p>
        </div>
        <div className='diff-infor-mess'>
          六类算法同步测算比较,EDD算法得出方案机床使用更均衡
        </div>
      </Col>
    </Row>
  </div>
};
export default connect()(leftBottom)