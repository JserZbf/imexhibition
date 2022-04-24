import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import Error from 'components/Error';
import TopBar from 'containers/TopBar';
import DocumentTitle from 'react-document-title';
import Category from '../Category';
import styles from './index.less';

@withRouter
@connect(() => ({}), () => ({}))
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
        };
    }

    componentDidMount() {
    }

    componentDidCatch(error, info) {
        console.error('Layout Catched Error:', error, info);
        this.setState({
            errorMessage: error.message || 'Layout Catched Error with no message.',
        });
    }

    render() {

        const { errorMessage } = this.state;
        const { children, location: { pathname } } = this.props;
        if (errorMessage) {
            return (
                <Error
                    message={errorMessage}
                    returnButtonText="返回首页"
                    onReturn={() => {
                        this.setState({
                            errorMessage: undefined,
                        });
                    }}
                />
            );
        }

        return (
            <ConfigProvider locale={zhCN}>
                <DocumentTitle title="重庆研究院">
                <div className={styles.content}>{children}</div>
                </DocumentTitle>
            </ConfigProvider>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

export default Layout;
