import React from 'react';
import { connect } from 'dva';


export default (Com) => {
  return connect(({ ums }) => ({ userInfo: ums.userInfo }))((props) => {
    const {
      userInfo: { dataPrivileges = [], routePrivileges = [], roles = [] },
    } = props;
    return (
      <Com
        {...props}
        roles={roles}
        dataPrivileges={dataPrivileges}
        routePrivileges={routePrivileges}
      />
    );
  });
};
