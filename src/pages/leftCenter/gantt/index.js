import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react';
import Echarts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import moment from 'moment';
import styles from './index.less';

const Gantt = ({ orderDetail }) => {
  const chartRef = useRef(null);
  const timer = useRef(null);

  const init = () => {
    timer?.current && clearTimeout(timer?.current);
  };

  useEffect(() => {
    if (orderDetail?.length) {
      init();
      ganttScroll();
    }
    return init;
  }, [orderDetail]);

  const formatPropData = useMemo(() => {
    let formatData = [];
    if (!Array.isArray(orderDetail)) {
      return {
        formatData,
      };
    }
    orderDetail.forEach((order, index) => {
      const { planLevel, planNO, productName, productNum, planStart, planEnd } = order;
      const startTimeStamp = moment(planStart).valueOf();
      const endTimeStamp = moment(planEnd).valueOf();
      formatData.push({
        name: planNO,
        value: [
          index,
          startTimeStamp,
          endTimeStamp,
          productName,
          productNum,
          planLevel,
          planStart,
          planEnd,
        ],
        itemStyle: {
          normal: {
            borderRadius: 5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#37B6E0', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#0554A6', // 100% 处的颜色
                },
              ],
            },
          },
        },
      });
    });
    return {
      formatData,
    };
  }, [orderDetail]);

  const ganttScroll = () => {
    const chart = chartRef?.current?.getEchartsInstance();
    if (!chart) return;
    timer.current = setTimeout(() => {
      const { dataZoom } = chart.getOption();
      const { start, end } = dataZoom?.[0];
      let _start = start + 25;
      let _end = end + 25;
      if (_end >= 100) {
        _start = 0;
        _end = 25;
      }
      chart?.dispatchAction({
        type: 'dataZoom',
        start: _start,
        end: _end,
      });
      ganttScroll();
    }, 5000);
  };

  const renderItem = (params, api) => {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height = api.size([0, 1])[1] * 0.6;
    let width = end[0] - start[0];
    let processName = `${api.value(3)} | ${api.value(4)} | ${api.value(5)}`;
    let processNameWidth = echarts.format.getTextRect(processName).width;
    let label = width > processNameWidth + 10 ? processName : '';
    let rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: width,
        height: height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      },
    );
    let rectText = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: width,
        height: height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      },
    );
    return {
      type: 'group',
      children: [
        {
          type: 'rect',
          shape: { ...rectShape, r: 10 },
          style: api.style(),
        },
        {
          type: 'rect',
          shape: rectText,
          style: api.style({
            fill: 'transparent',
            stroke: 'transparent',
            text: label,
            textFill: '#fff',
          }),
        },
      ],
    };
  };

  const getOption = useCallback(() => {
    const { formatData } = formatPropData;
    return {
      xAxis: {
        type: 'time',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0F58EA',
            width: 3,
          },
        },
        axisLabel: {
          show: true,
          color: '#fff',
          formatter: '{yyyy}-{M}-{d} {HH}-{mm}-{ss}',
        },
        splitLine: {
          show: true,
          interval: 0,
          lineStyle: {
            color: ['#0074FE'],
          },
        },
      },
      yAxis: {
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: 0,
          start: 0,
          end: 25,
          zoomLock: true,
          zoomOnMouseWheel: false,
        },
      ],
      grid: {
        show: true,
        top: '5%',
        bottom: '5%',
        left: '5%',
        right: '5%',
        containLabel: true,
        borderWidth: 0,
      },
      series: [
        {
          type: 'custom',
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8,
          },
          encode: {
            x: [1, 2],
            y: 0,
          },
          data: formatData,
        },
      ],
    };
  }, [orderDetail]);

  return (
    <div className={styles.gantt}>
      <Echarts option={getOption()} ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default memo(Gantt);
