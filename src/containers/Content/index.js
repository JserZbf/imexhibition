import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import pathConfig from 'config/pathConfig';
import { keys } from 'lodash-es';
import { Spin, Breadcrumb } from 'antd';
import styles from './index.less';

const { matchPath } = require('dva/router')

const Content = ({
  className,
  bodyClassName,
  isShowBreadcrumb,
  children,
  loading = false,
  globalLoading,
  location,
  isShowLoading,
}) => {
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const pathArray = keys(pathConfig).map((key) => {
    return pathConfig[key];
  });
  return (
    <div
      className={`${styles.container} ${isShowBreadcrumb ? '' : styles.hideBreadcrumb} ${
        className || ''
      }`}
    >
      {isShowBreadcrumb && (
        <Breadcrumb className={styles.breadcrumb}>
          {pathSnippets
            .map((_, index) => {
              const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
              const path =
                pathArray.find((p) =>
                  matchPath(url, {
                    path: p.path,
                    exact: true,
                    strict: false,
                  }),
                ) || {};
              return (
                path.name && (
                  <Breadcrumb.Item key={url}>
                    {path.disableLink ? path.name : <Link to={url}>{path.name}</Link>}
                  </Breadcrumb.Item>
                )
              );
            })
            .filter((b) => b)}
        </Breadcrumb>
      )}
      <Spin
        spinning={isShowLoading !== false && (globalLoading || loading)}
        tip="加载中..."
        size="large"
        wrapperClassName={styles.spin}
      >
        <div className={`${styles.content} ${bodyClassName || ''}`}>{children}</div>
      </Spin>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  globalLoading: PropTypes.bool,
  loading: PropTypes.bool,
  isShowBreadcrumb: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Content.defaultProps = {
  isShowBreadcrumb: true,
};

export default connect(({ loading }) => {
  const { global: globalLoading } = loading;
  return {
    globalLoading,
  };
})(withRouter(Content));
