import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'

import LeftTop from '../leftTop/index'
import LeftCenter from '../leftCenter/index'
import LeftBottom from '../leftBottom/index'
import RightTop from '../rightTop/index'
const Home = function (props) {
  return <div className='wrap'>
    <Row>
      <Col span={8}>
        <LeftTop />
        <LeftCenter />
        <LeftBottom />
      </Col>
      <Col span={8}>
        <h1>订单预计结果评估</h1>
      </Col>
      <Col span={8}>
        <RightTop />
      </Col>
    </Row>
  </div>;
};

export default connect((state) => ({ time: state.page.time })/* , (dispatch) => ({
  setMessM: (payload) => dispatch({ type: 'ums/setMessM', payload }),
}) */
)(Home)