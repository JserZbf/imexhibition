import React from 'react';
import { Redirect } from 'umi';
import pathConfig from 'config/pathConfig';

const index = () => {
  return <Redirect to={pathConfig.default.path} />;
};

export default index;
