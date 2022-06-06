import React, { useState } from 'react';
import { connect } from 'dva';
import './index.less'
const RightTop = function (props) {
  const { allData, deviceUseTime } = props;
  const infor = [
    {
      title: '排产订单号',
      value: allData.orderNO
    },
    {
      title: '排产日期',
      value: allData.scheduleCycle
    }, {
      title: '机床可用时间',
      value: deviceUseTime
    },
    {
      title: '是否存在月度保养计划',
      value: allData.isHasMaintenance ? '是' : '否'
    }
  ];
  return <div className='right-top'>
    <div className='right-top-infor'>
      <div className='jian-tou'></div>
      <span>订单算法基础信息</span>
    </div>
    <div className='right-top-split'>

    </div>
    <div className='right-top-list'>
      <ul>
        {
          infor.map((item, index) => {
            return <li key={index}>
              <span>{item.title}</span>
              <span>{item.value}</span>
            </li>
          })
        }
      </ul>
    </div>
  </div>;
};

export default connect()(RightTop)