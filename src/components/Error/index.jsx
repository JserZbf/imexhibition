import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import styles from './index.less';

const Error = (props) => {
  const { returnButtonText, onReturn, message } = props;
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉页面出现了一些错误"
      extra={
        <Button type="primary" onClick={onReturn}>
          {returnButtonText}
        </Button>
      }
    >
      <div className={styles.title}>{message}</div>
    </Result>
  );
};

Error.propTypes = {
  returnButtonText: PropTypes.string,
  message: PropTypes.string,
  onReturn: PropTypes.func,
};

Error.defaultProps = {
  returnButtonText: '返回',
};

export default Error;
