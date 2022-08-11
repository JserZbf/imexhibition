import React, { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import Echarts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import moment from 'moment';
import { groupBy, map, uniq, sortBy, head } from 'lodash-es';
import styles from './index.less';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const HALF_DAY_MILLISECOND = 43200000; // 12小时毫秒数
const GANTT_SCROLL_INTERVAL = 5000; // 甘特图滚动定时器间隔
const MIN_LEGEND_SCROLL_NUM = 26; // 图例最小开启滚动数
const LEGEND_SCROLL_INTERVAL = 60; // 图例滚动定时器间隔
const SECOND_SCROLL_HEIGHT = 3; // 图例每秒滚动高度

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
  const legendContainerRef = useRef(null);
  const chartRef = useRef(null);
  const ganttTimer = useRef(null);
  const legendTimer = useRef(null);

  const [simulationTime, setSimulationTime] = useState([]);

  const init = () => {
    legendTimer?.current && clearTimeout(legendTimer?.current);
    ganttTimer?.current && clearTimeout(ganttTimer?.current);
  };

  useEffect(() => {
    init();
    initSimulationTime();
    ganttScroll();
    legendScroll();
    return init;
  }, [orderScheduleDetail]);

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

  const getHeadDate = () => {
    const { startTime } =
      head(sortBy(orderScheduleDetail, (d) => moment(d.startTime).valueOf())) ?? {};
    return moment(startTime).hour(8).minute(0).second(0);
  };

  const initSimulationTime = () => {
    const headTime = getHeadDate();
    const start = headTime.format(DATE_FORMAT);
    const end = headTime.add(12, 'hours').format(DATE_FORMAT);
    setSimulationTime([start, end]);
  };

  const ganttScroll = () => {
    const chart = chartRef?.current?.getEchartsInstance();
    if (!chart) return;
    const headTime = getHeadDate();
    const startTime = headTime.valueOf(); // 滚动的最小日期
    const endTime = headTime.add(7, 'days').valueOf(); // 滚动的最大日期
    ganttTimer.current = setTimeout(() => {
      const option = chart?.getOption() ?? {};
      const { dataZoom: [zoom] = [] } = option;
      const { startValue, endValue } = zoom ?? {};
      if (endValue + HALF_DAY_MILLISECOND > endTime) {
        const start = headTime.format(DATE_FORMAT);
        const end = headTime.add(12, 'hours').format(DATE_FORMAT);
        setSimulationTime([start, end]);
        chart?.dispatchAction({
          type: 'dataZoom',
          startValue: startTime,
          endValue: startTime + HALF_DAY_MILLISECOND,
        });
      } else {
        const start = moment(startValue + HALF_DAY_MILLISECOND).format(DATE_FORMAT);
        const end = moment(endValue + HALF_DAY_MILLISECOND).format(DATE_FORMAT);
        setSimulationTime([start, end]);
        chart?.dispatchAction({
          type: 'dataZoom',
          startValue: startValue + HALF_DAY_MILLISECOND,
          endValue: endValue + HALF_DAY_MILLISECOND,
        });
      }
      ganttScroll();
    }, GANTT_SCROLL_INTERVAL);
  };

  const legendScroll = () => {
    const { legendData } = formatPropData;
    const legendContainer = legendContainerRef?.current;
    if (Array.isArray(legendData) && legendData.length > MIN_LEGEND_SCROLL_NUM) {
      const scrollTop = legendContainer?.scrollTop;
      const clientHeight = legendContainer?.clientHeight;
      const scrollHeight = legendContainer?.scrollHeight;
      legendTimer.current = setTimeout(() => {
        legendContainer.scrollTop += SECOND_SCROLL_HEIGHT;
        if (clientHeight + scrollTop >= scrollHeight) {
          legendContainer.scrollTop = 0;
        }
        legendScroll();
      }, LEGEND_SCROLL_INTERVAL);
    }
  };

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
    const nowTime = moment().format(DATE_FORMAT);
    const startTimeVal = getHeadDate().valueOf();
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
          startValue: startTimeVal,
          endValue: startTimeVal + HALF_DAY_MILLISECOND,
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
              distance: [0, 20],
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
                  coord: [moment().valueOf(), yData],
                },
                // {
                //   coord: [moment().valueOf(), yData.at(-1)],
                // },
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
      <div className={styles.simulationTime}>
        <span>{simulationTime[0]}-</span>
        <span>{simulationTime[1]}</span>
      </div>
      <div className={styles.legendBox} ref={legendContainerRef}>
        {renderLegendItem()}
      </div>
      <Echarts option={getOption()} ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default memo(Gantt);
