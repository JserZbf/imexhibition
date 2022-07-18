import React, { useState } from 'react';
import { connect } from 'dva';
import './index.less';
const RightBottom = function (props) {
  const { rightBottomInfor } = props;
  const infor = [
    {
      title: '可用机床数',
      value: rightBottomInfor.availableNum,
    },
    {
      title: '排产实际使用机床数',
      value: rightBottomInfor.ActualUsedNum,
    },
    {
      title: '排产机床使用率',
      value: (rightBottomInfor.useRate * 100).toFixed(2) + '%',
    },
  ];
  return (
    <div className="right-bottom">
      <div className="right-top-infor">
        <div className="jian-tou"></div>
        <span>机床使用率相关信息</span>
      </div>
      <div className="right-top-split"></div>
      <div className="right-top-list">
        <ul>
          {infor.map((item, index) => {
            return (
              <li key={index}>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect()(RightBottom);
