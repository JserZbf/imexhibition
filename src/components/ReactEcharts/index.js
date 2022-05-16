import React, { } from 'react'
import ReactEcharts from 'echarts-for-react'
const ReactEchartsCom = React.memo((props) => {
    return (
        <ReactEcharts
            key={Math.random() + new Date().getTime()}
            option={props.option}
            notMerge={false}
            lazyUpdate={false}
            style={{ height: '210px', width: '210px', left: '20px', top: '20px' }}
        />
    )
})
export default ReactEchartsCom;