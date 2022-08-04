import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import './index.less';
const LeftTop = function (props) {
  const { currentTime } = props;
  return (
    <div className="left-top">
      <div className="left-top-top">
        <div className="jian-tou"></div>
        <span>模拟时间</span>
      </div>
      <div className="left-top-bottom">
        {/*   {moment(GetDateStr(1)).format('YYYY/M/DD HH:mm:ssA')} */}
        {currentTime}
      </div>
    </div>
  );
};

export default connect()(LeftTop);
