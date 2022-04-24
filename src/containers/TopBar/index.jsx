import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect,routerRedux } from 'dva';
import { Dropdown, Menu, Modal, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import pathConfig from 'config/pathConfig';
import styles from './index.less';


@withRouter
@connect(
  ({ ums, baseLayout }) => ({
    userInfo: ums.userInfo,
    sideMenus: baseLayout.sideMenus,
  }),
  (dispatch) => ({
    ssoLogout: () => dispatch({ type: 'ums/ssoLogout' }),
    navTo: (payload) => dispatch(routerRedux.push(payload)),
  }),
)
class TopBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { ssoLogout, navTo } = this.props;
    return (
      <div className={styles.headContainer} data-spm-module="topBar">
        <div
          className={styles.headLeft}
          onClick={() => {
            navTo(pathConfig.default.path);
          }}
          role="button"
        >
          <span className={styles.headLeftIcon} />
          <span className={styles.headTitle}>新能源系统</span>
        </div>
        <div className={styles.headCenter} />
        <div className={styles.headRight}>
          <Tooltip title="使用文档">
            <Button
              data-spm-event="使用文档"
              className={styles.action}
              type="text"
              icon={<QuestionCircleOutlined />}
              target="_blank"
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="logout"
                  onClick={() => {
                    Modal.confirm({
                      title: '确定退出登录？',
                      onOk: ssoLogout,
                    });
                  }}
                >
                  退出
                </Menu.Item>
              </Menu>
            }
          >
            <div className={styles.avatarWrapper}>
              <span className={styles.userName}>张宝丰</span>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  ssoLogout: PropTypes.func,
};
export default TopBar;
