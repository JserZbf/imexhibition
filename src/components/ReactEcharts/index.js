import React, { } from 'react'
import ReactEcharts from 'echarts-for-react'
const ReactEchartsCom = React.memo((props) => {
    return (
        <ReactEcharts
            key={Math.random() + new Date().getTime()}
            option={props.option}
            notMerge={false}
            lazyUpdate={false}
            style={{ height: '230px', width: '230px', left: '24px', top: '7px' }}
        />
    )
})
export default ReactEchartsCom;