import React, { useEffect } from 'react';
import { connect } from 'dva';

const Home = function (props) {
  console.log(props, 'propss');
  return <div>{props.mess}</div>;
};

export default connect((state) => ({ mess: state.homeCenter.mess }))(Home)
