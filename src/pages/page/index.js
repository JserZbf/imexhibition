import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'

import LeftTop from '../leftTop/index'
import LeftCenter from '../leftCenter/index'
import LeftBottom from '../leftBottom/index'
import RightTop from '../rightTop/index'
import RightCenter from '../rightCenter/index'
const Home = function (props) {
  return <div className='wrap'>
    <Row>
      <Col span={8}>
        <LeftTop />
        <LeftCenter />
        <LeftBottom />
      </Col>
      <Col span={8} className='center-middle'>
        <div className='main-title'></div>
        <div className='digitization-title'>
          <div></div>
          <div>
            <p>数字化</p>
            <p>Digitzing</p>
          </div>
        </div>
        <div className='modernization-title'>
          <div></div>
          <div>
            <p>现代化</p>
            <p>MODERNIZATION</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <RightTop />
        <RightCenter/>
      </Col>
    </Row>
  </div>;
};

export default connect((state) => ({ time: state.page.time })/* , (dispatch) => ({
  setMessM: (payload) => dispatch({ type: 'ums/setMessM', payload }),
}) */
)(Home)