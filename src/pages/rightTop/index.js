import React, { useState } from 'react';
import { connect } from 'dva';
import './index.less'
const RightTop = function (props) {
  const [infor, setInfor] = useState([
    {
      title: '排产订单号',
      value: '10086117818'
    },
    {
      title: '排产日期',
      value: '7日'
    }, {
      title: '机床可用时间',
      value: '8:00-17:00,19:00-次日8:00'
    },
    {
      title: '是否存在月度保养计划',
      value: '否'
    }
  ])
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