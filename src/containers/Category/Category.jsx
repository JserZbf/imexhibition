import React, { Component } from 'react';
import { connect ,routerRedux} from 'dva';
import { withRouter } from 'react-router';
import Iconfont from 'components/Iconfont';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Menu, Badge } from 'antd';
import styles from './Category.less';


const { SubMenu } = Menu;

@withRouter
@connect(
    ({ baseLayout }) => ({
        sideMenus: baseLayout.sideMenus,
    }),
    (dispatch) => ({
        navTo: (payload) => dispatch(routerRedux.push(payload)),
        saveUserInfo: (payload) => dispatch({ type: 'ums/save', payload }),
    }),
)
class Category extends Component {
    constructor() {
        super();
        this.state = {
            openKeys: [],
            collapsed: false,
        };

        this.renderMenuItem = (item) => {
            const { navTo, showTrackingInfo } = this.props;
            const { path } = item;
            return (
                <Menu.Item
                    key={path}
                    onClick={() => {
                        if (!path) {
                            return;
                        }
                        navTo(path);
                    }}
                >
                    {item.icon ? (
                        <Iconfont className={styles.menuIcon} type={item.icon || ''} iconMode="unicode" />
                    ) : (
                        <span className={styles.menuIcon}>&nbsp;</span>
                    )}
                    <span data-spm-event={item.name}>
                        {showTrackingInfo ? (
                            <Badge size="small" count={0} showZero offset={[10, 0]} overflowCount={999}>
                                {item.name}
                            </Badge>
                        ) : (
                            item.name
                        )}
                    </span>
                </Menu.Item>
            );
        };

        this.getOpenKeys = (sideMenuData, result = []) => {
            const {
                location: { pathname },
            } = this.props;
            const target = sideMenuData.find(
                (item) => pathname.includes(item.path) && item.path !== pathname,
            );
            if (target) {
                result.push(target.path);
                return this.getOpenKeys(target.children || [], result);
            }
            return result;
        };
    }

    componentDidMount() {

        const {
            location: { pathname },
            sideMenus,
            saveUserInfo,
        } = this.props;
        saveUserInfo({
            userInfo: JSON.parse(localStorage.getItem('menu') || '{}')
        })
        setTimeout(() => {
            this.setState({ openKeys: this.getOpenKeys(sideMenus || []) });
        }, 100);
    }

    componentDidUpdate(prevProps) {
        const {
            location: { pathname },
            sideMenus,
        } = this.props;
        const {
            location: { pathname: prePathname },
        } = prevProps;
        if (prePathname === pathname) return;
        setTimeout(() => {
            this.setState({ openKeys: this.getOpenKeys(sideMenus || []) });
        }, 100);
    }

    renderSideMenu(children) {
        if (children) {
            return (children || []).map(this.renderMenuItem);
        }
        return [];
    }

    getSelectedKeys({ sideMenus, pathname }) {
        let target;
        for (let i = 0; i < sideMenus.length;) {
            const item = sideMenus[i];
            target = this.findItem(item, pathname);
            if (target) {
                return [target.path];
            }
            i += 1;
        }
        target = sideMenus.find((item) =>
            this.findItem(item, pathname, (lItem, tValue) => {
                return (tValue || '').startsWith(lItem.path);
            }),
        );
        if (target) {
            return [target.path];
        }
        return [];
    }

    findItem(
        item,
        value,
        compare = (lItem, tValue) => {
            return lItem.path === tValue;
        },
    ) {
        const target = compare(item, value);
        if (target) return item;
        return (item.children || []).find((i) => {
            return this.findItem(i, value, (lItem, tValue) => {
                return (tValue || '').startsWith(lItem.path);
            });
        });
    }

    render() {
        const { location, sideMenus } = this.props;
        const { pathname } = location;
        const { openKeys, collapsed } = this.state;
        // const routePrivileges = JSON.parse(localStorage.getItem('menu') || '[]');
        return (
            <div className={styles.categoryContainer} data-spm-module="sideMenu">
                <div
                    role="button"
                    className={collapsed ? styles.toggleShrink : styles.toggleCollapsed}
                    onClick={() => {
                        this.setState({
                            collapsed: !collapsed,
                        });
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined className={styles.icon} /> : <MenuFoldOutlined className={styles.icon} />}
                </div>
                <Menu
                    selectedKeys={this.getSelectedKeys({
                        sideMenus,
                        pathname,
                    })}
                    theme="dark"
                    openKeys={openKeys}
                    inlineIndent={12}
                    onOpenChange={(keys) => {
                        this.setState({ openKeys: keys });
                    }}
                    inlineCollapsed={collapsed}
                    mode="inline"
                    className={styles.menu}
                >
                    {(sideMenus || []).map((item) => {
                        if (!item.children || !item.children.length) {
                            return this.renderMenuItem(item);
                        }
                        return (
                            <SubMenu
                                key={item.path}
                                title={
                                    <span>
                                        {item.icon ? (
                                            <Iconfont
                                                className={styles.menuIcon}
                                                type={item.icon || ''}
                                                iconMode="unicode"
                                            />
                                        ) : (
                                            <span className={styles.menuIcon}>&nbsp;</span>
                                        )}
                                        <span>{item.name}</span>
                                    </span>
                                }
                            >
                                {this.renderSideMenu(item.children)}
                            </SubMenu>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}

export default Category;
