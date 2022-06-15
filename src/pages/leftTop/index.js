import React, {useEffect,useState} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import './index.less'
const LeftTop = function (props) {
  const [currentTime,setCurrentTime]=useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 100)
    return () => {
      clearInterval(timer)
    }
  },[])
  return <div className='left-top'>
    <div className='left-top-top'>
      <div className='jian-tou'></div>
      <span>模拟时间</span>
    </div>
    <div className='left-top-bottom'>
      {moment(currentTime).format('YYYY/M/DD HH:mm:ssA')}
    </div>
  </div>;
};

export default connect()(LeftTop)