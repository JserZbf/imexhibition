import React, { memo, useMemo, useCallback, useRef } from 'react';
import Echarts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import moment from 'moment';
import { groupBy, map, uniq } from 'lodash-es';
import styles from './index.less';

const randomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = r.toString(16) + g.toString(16) + b.toString(16);
  while (color.length < 6) {
    color += '0';
  }
  return '#' + color;
};

const Gantt = ({ orderScheduleDetail }) => {
  const colorMap = useRef({});
  const formatPropData = useMemo(() => {
    let yData = [];
    let formatData = [];
    let legendData = [];
    if (!Array.isArray(orderScheduleDetail)) {
      return {
        formatData,
        yData,
      };
    }
    legendData = uniq(orderScheduleDetail.map((o) => o.productName)).map((p) => {
      let color = colorMap?.current?.[p];
      if (!color) {
        const _color = randomColor();
        colorMap.current[p] = _color;
        color = _color;
      }
      return {
        name: p,
        icon: 'circle',
        itemStyle: {
          color,
        },
      };
    });
    const groupByMachine = map(groupBy(orderScheduleDetail, 'machineName'), (value, key) => {
      yData.push(key);
      return {
        machineName: key,
        orderTaskList: value,
      };
    });
    groupByMachine.forEach((machine, index) => {
      const { machineName, orderTaskList } = machine;
      orderTaskList.forEach((plan) => {
        const { opName, startTime, endTime, productName } = plan;
        const startTimeStamp = moment(startTime).valueOf();
        const endTimeStamp = moment(endTime).valueOf();
        formatData.push({
          name: machineName,
          value: [
            index,
            startTimeStamp,
            endTimeStamp,
            opName,
            productName,
            startTime,
            endTime,
            machineName,
          ],
          itemStyle: {
            normal: {
              color: colorMap.current[productName] ?? '#FFF',
            },
          },
        });
      });
    });
    return {
      formatData,
      yData,
      legendData,
    };
  }, [orderScheduleDetail]);
  const renderItem = (params, api) => {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height = api.size([0, 1])[1] * 0.6;
    let width = end[0] - start[0];
    let processName = `${api.value(3)}`;
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
          // transition: ['shape'],
          ignore: !rectShape,
          shape: rectShape,
          style: api.style(),
        },
        {
          type: 'rect',
          ignore: !rectText,
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
    const { formatData, yData } = formatPropData;
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    return {
      tooltip: {
        formatter: function (params) {
          return `
            设备: ${params.value[7]}<br/>
            工序：${params.value[3]}<br/>
            产品：${params.value[4]}<br/>
            开始时间：${params.value[5]}<br/>
            结束时间：${params.value[6]}<br/>
          `;
        },
      },
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
      },
      yAxis: {
        data: yData,
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: true, color: '#fff' },
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          start: 0,
          end: 14,
          zoomLock: true,
          zoomOnMouseWheel: false,
        },
      ],
      grid: {
        show: true,
        top: '10%',
        bottom: '11%',
        left: '6%',
        right: '10%',
        containLabel: true,
        borderWidth: 0,
      },
      series: [
        {
          type: 'line',
          markLine: {
            silent: true,
            symbol: 'none',
            label: {
              color: '#fff',
              fontFamily: 'Arial',
              textBorderType: 0,
            },
            lineStyle: {
              color: '#0F58EA',
              width: 3,
              type: 'solid',
              shadowBlur: 0,
            },
            data: [
              [
                {
                  name: nowTime,
                  coord: [moment().valueOf(), yData[0]],
                },
                {
                  coord: [moment().valueOf(), yData.at(-1)],
                },
              ],
            ],
          },
        },
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
  }, [orderScheduleDetail]);
  const renderLegendItem = () => {
    return formatPropData?.legendData?.map((item) => {
      return (
        <div className={styles.legendItem} key={item.name}>
          <div
            className={styles.dot}
            style={{ backgroundColor: item?.itemStyle?.color ?? '#fff' }}
          ></div>
          <div className={styles.label}>{item.name}</div>
        </div>
      );
    });
  };
  return (
    <div className={styles.gantt}>
      <div className={styles.legendBox}>{renderLegendItem()}</div>
      <Echarts option={getOption()} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default memo(Gantt);
