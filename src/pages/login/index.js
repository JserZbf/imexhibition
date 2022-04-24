import React, { useEffect } from 'react';
import { connect } from 'dva';

const Login = function ({ userInfo, userLogin }) {
  useEffect(() => {
    userLogin({
      enterpriseCode: 'admin',
      password: 'admin',
      userCode: 'admin',
    });
  }, [userLogin]);
  return <div>Login</div>;
};

export default connect(
  ({ ums }) => ({
    userInfo: ums.userInfo,
  }),
  (dispatch) => ({
    userLogin: (payload) => dispatch({ type: 'ums/userLogin', payload }),
  }),
)(Login);
