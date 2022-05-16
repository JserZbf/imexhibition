import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Row, Col, Steps, Popover, Table, Tag, Space } from 'antd';
const { Step } = Steps;
import moment from 'moment';
import './index.less'
import ReactEchartsCom from '../../components/ReactEcharts/index'
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const Home = function (props) {
  const [txt, setTxt] = useState('');
  const [echartsList, setEchartsList] = useState([
    {
      title: {
        text: '75%',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: "#0bb6f0",
          fontSize: 20
        }
      },
      //backgroundColor: '#011128',
      // backgroundColor:'pink',
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: ['70%', '80%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        },
        hoverAnimation: false,
        data: [{
          value: 25,
          name: '01',
          itemStyle: {
            normal: {
              color: '#6879F7',//已完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        }, {
          value: 75,
          name: 'invisible',
          itemStyle: {
            normal: {
              color: '#071D58',//未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
            }
          },
        },
        ]
      }, {
        name: 'Line 2',
        type: 'pie',
        animation: false,
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            color: '#7CA9FF',//外层圆环的颜色
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(44,59,70,1)'//外层圆环的颜色
          }
        },
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 100,
          name: '02',
        }
        ]
      },
      ]
    },
  ]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => {
        return (index + 1)
      }
    },
    {
      title: '物料类型',
      dataIndex: 'materialType',
      key: 'materialType'
    },
    {
      title: '规格类型',
      dataIndex: 'specificationType',
      key: 'specificationType'
    },
    {
      title: '需求数量',
      dataIndex: 'needNumber',
      key: 'needNumber',
    },
    {
      title: '库存数量',
      dataIndex: 'inventory',
      key: 'inventory ',
    },
    {
      title: '物料是否不足',
      dataIndex: 'materialBool',
      key: 'materialBool ',
    },
    {
      title: '物料缺口数量',
      dataIndex: 'materialGapNumber',
      key: 'materialGapNumber ',
    }
  ];

  const data = [
    {
      materialType: '毛坯',
      specificationType: '物料名称',
      needNumber: 32,
      inventory: 11,
      materialBool: '是',
      materialGapNumber: 2
    },
    {
      materialType: '毛坯',
      specificationType: '物料名称',
      needNumber: 32,
      inventory: 11,
      materialBool: '是',
      materialGapNumber: 2
    },
    {
      materialType: '毛坯',
      specificationType: '物料名称',
      needNumber: 32,
      inventory: 11,
      materialBool: '是',
      materialGapNumber: 2
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setTxt(new Date());
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return <div className='wrap'>
    <Row>
      <Col span={8}>
        <div className='moni-time'>
          <div className='moni-time-top'>
            <div className='jian-tou'></div>
            <span>模拟时间</span>
          </div>
          <div className='moni-time-bottom'>
            {moment(txt).format('YYYY-MM-DD HH:mm:ssA')}
          </div>
        </div>
        <div className='plan-total'>
          <Row>
            <Col span={8} push={2}>
            <Table className='table-material' columns={columns} dataSource={data} pagination={false} />
            </Col>
            <Col span={6} push={2}>
              <Table className='table-material' columns={columns} dataSource={data} pagination={false} />
            </Col>
            <Col span={8} push={2}>
              <div className='ehcarts-yield-one'>
                <ReactEchartsCom option={echartsList[0]} />
                <div>
                  <ul>
                    <li className='title'>计划编号</li>
                    <li className='title'>产品名称</li>
                    <li className='title'>计划等级</li>
                    <li className='title'>状态</li>
                    <li className='title-button'>
                      <span>加工中</span>
                      <span>未加工</span>
                      <span>已加工</span>
                    </li>
                  </ul>
                  <Steps className='steps' current={3} progressDot={customDot}>
                    <Step title="计划开始时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="超期完成时间" description="" />
                  </Steps>
                </div>
              </div>
              <div className='ehcarts-yield-two'>
                <ReactEchartsCom option={echartsList[0]} />
                <div>
                  <ul>
                    <li className='title'>计划编号</li>
                    <li className='title'>产品名称</li>
                    <li className='title'>计划等级</li>
                    <li className='title'>状态</li>
                    <li className='title-button'>
                      <span>加工中</span>
                      <span>未加工</span>
                      <span>已加工</span>
                    </li>
                  </ul>
                  <Steps className='steps' current={3} progressDot={customDot}>
                    <Step title="计划开始时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="超期完成时间" description="" />
                  </Steps>
                </div>
              </div>
              <div className='ehcarts-yield-three'>
                <ReactEchartsCom option={echartsList[0]} />
                <div>
                  <ul>
                    <li className='title'>计划编号</li>
                    <li className='title'>产品名称</li>
                    <li className='title'>计划等级</li>
                    <li className='title'>状态</li>
                    <li className='title-button'>
                      <span>加工中</span>
                      <span>未加工</span>
                      <span>已加工</span>
                    </li>
                  </ul>
                  <Steps className='steps' current={3} progressDot={customDot}>
                    <Step title="计划开始时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="超期完成时间" description="" />
                  </Steps>
                </div>
              </div>
              <div className='ehcarts-yield-four'>
                <ReactEchartsCom option={echartsList[0]} />
                <div>
                  <ul>
                    <li className='title'>计划编号</li>
                    <li className='title'>产品名称</li>
                    <li className='title'>计划等级</li>
                    <li className='title'>状态</li>
                    <li className='title-button'>
                      <span>加工中</span>
                      <span>未加工</span>
                      <span>已加工</span>
                    </li>
                  </ul>
                  <Steps className='steps' current={3} progressDot={customDot}>
                    <Step title="计划开始时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="最晚结束时间" description="" />
                    <Step title="超期完成时间" description="" />
                  </Steps>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={8}>

      </Col>
      <Col span={8}></Col>
    </Row>
  </div>;
};

export default connect((state) => ({ time: state.page.time })/* , (dispatch) => ({
  setMessM: (payload) => dispatch({ type: 'ums/setMessM', payload }),
}) */
)(Home)