import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const SpinLoading = (props) => {
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  );
};

export default SpinLoading;
