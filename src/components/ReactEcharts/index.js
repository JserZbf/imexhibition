import React, { } from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types';
const ReactEchartsCom = React.memo((props) => {
    return (
        <ReactEcharts
            key={Math.random() + new Date().getTime()}
            option={props.option}
            notMerge={false}
            lazyUpdate={false}
            style={{ height: props.height, width: props.width, left: props.left, top: props.top }}
        />
    )
})
ReactEchartsCom.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string
};
ReactEchartsCom.defaultProps = {
    width: '230px',
    height: '230px',
    left: '24px',
    top: '7px'
};

export default ReactEchartsCom;