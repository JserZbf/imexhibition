import { Menu } from 'antd';
import Iconfont from 'components/Iconfont';
import React from 'react';
import styles from './index.less';

const { SubMenu } = Menu;

class SideMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  getSideMenuData() {
    const { collapsed } = this.state;
    const { data } = this.props;
    return data.map((item) => {
      return {
        ...item,
        textClassName: collapsed ? styles.subTitle : styles.titleMarginLeft,
        children: (item.children || []).map((c) => ({
          ...c,
          textClassName: styles.menuItemTitle,
          wrapperClassName: collapsed ? null : styles.menuItemContainer,
        })),
      };
    });
  }

  render() {
    const { collapsed } = this.state;
    const { renderBottom = () => {} } = this.props;
    const menuData = this.getSideMenuData();
    return (
      <div
        className={`${styles.menuContainer} ${
          collapsed ? styles.toggleShrink : styles.toggleCollapsed
        }`}
      >
        <div
          role="button"
          className={styles.collapseWrap}
          onClick={() => {
            this.setState({
              collapsed: !collapsed,
            });
          }}
        >
          <Iconfont
            className={styles.icon}
            type={collapsed ? 'icon-liebiaozhankai' : 'icon-liebiaoshouqi'}
          />
        </div>
        <Menu
          defaultOpenKeys={menuData.map((item) => item.key)}
          mode="inline"
          className={styles.menu}
          inlineCollapsed={collapsed}
          selectable={false}
        >
          {menuData.map((item) => {
            return (
              <SubMenu
                key={item.key}
                title={
                  <div>
                    <Iconfont type={item.icon} />
                    <span className={item.textClassName}>{item.text}</span>
                  </div>
                }
              >
                {item.children.map((c) => {
                  return (
                    <Menu.Item key={c.key}>
                      <div
                        className={`getItem ${c.wrapperClassName}`}
                        data-size={c.size}
                        data-shape={c.shape || 'commonShape'}
                        data-type="node"
                        data-label={c.text}
                      >
                        <Iconfont type={c.icon} />
                        <span className={c.textClassName}>{c.text}</span>
                      </div>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
          {!collapsed && renderBottom()}
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
