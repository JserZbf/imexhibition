import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import './index.less';

const LeftTop = (props) => {
  const { currentTime } = props;
  // const setJumpNumber = (startNum, targetNum, time = 1, selector) => {
  //   let dom = document.querySelector(selector);
  //   let originNum = startNum;
  //   let stepNum = 0;
  //   let timeNum = time;
  //   dom.innerHTML = startNum;
  //   let timeId = setInterval(() => {
  //     if (originNum < targetNum) {
  //       timeNum -= 0.001;
  //       let strNum = originNum.toString();
  //       // 数字比较少的时候直接用 + 1; 数字很大直接 +1 要很久才能调到最对应的数字，所有后三位数随机跳动的方式进行模拟生成
  //      // if (targetNum.toString().length < 6) {
  //         stepNum += 1; // 这样才可以实现越跳越快的效果
  //         originNum = originNum + stepNum;
  //         dom.innerHTML = originNum;
  //     //  }
  //     } else {
  //       dom.innerHTML = targetNum;
  //       clearInterval(timeId);
  //     }
  //   }, timeNum);
  // };
  // const start = () => {
  //   setJumpNumber(0, 235959, 1, '.left-top-bottom');
  // };
  return (
    <div className="left-top">
      <div className="left-top-top">
        <div className="jian-tou"></div>
        <span
          onClick={() => {
            start();
          }}
        >
          模拟时间
        </span>
      </div>
      <div className="left-top-bottom">
        {/*   {moment(GetDateStr(1)).format('YYYY/M/DD HH:mm:ssA')} */}
        {currentTime}
      </div>
    </div>
  );
};

export default connect()(LeftTop);
