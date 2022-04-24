import React from 'react';
import { connect } from 'dva';
import { Result, Button } from 'antd';

const NoAuth = function ({ ssoLogout }) {
  return (
    <Result
      status="403"
      title="无权限"
      subTitle="对不起，您无权限使用系统"
      extra={
        <Button
          type="primary"
          onClick={() => {
            if (process.env.isUms === 'Y') {
              ssoLogout();
            }
          }}
        >
          退出
        </Button>
      }
    />
  );
};

export default connect(undefined, (dispatch) => ({
  ssoLogout: () => dispatch({ type: 'ums/ssoLogout' }),
}))(NoAuth);
