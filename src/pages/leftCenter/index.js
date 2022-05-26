import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col, Steps, Popover, Table } from 'antd';
const { Step } = Steps;
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
const leftCenter = function (props) {
  const { materialDemandList } = props;
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
      key: 'materialType',
      render: (text, record, index) => {
        if(record.materialType=='blank'){
          return '毛坯'
        }else if(record.materialType=='fixture'){
          return '夹具'
        }else if(record.materialType=='tray'){
          return '托盘'
        }else if(record.materialType=='tool'){
          return '刀具'
        }
      }
    },
    {
      title: '规格类型',
      dataIndex: 'Specs',
      key: 'Specs'
    },
    {
      title: '需求数量',
      dataIndex: 'demandNum',
      key: 'demandNum',
    },
    {
      title: '库存数量',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity ',
    },
    {
      title: '物料是否不足',
      dataIndex: 'isAdequate',
      key: 'isAdequate ',
    },
    {
      title: '物料缺口数量',
      dataIndex: 'shortNum',
      key: 'shortNum ',
    }
  ];
  return <div className='left-center'>
    <Row>
      <Col span={9}>
        <div className='plan-mark-total'>
          <ul className='back-line-list'>
            <li className='one'></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className='plan-mark-title'>
            <div className='jian-tou'></div>
            <span>计划号集合</span>
          </div>
          <ul className='data-list'>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
            <li>
              <span>产品名称</span>
              <span className='line'></span>
              <span>需求数量</span>
              <span className='line'></span>
              <span>计划等级</span>
            </li>
          </ul>
          <ul className='data-last-line'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li>计划开始时间</li>
            <li>计划结束时间</li>
          </ul>
        </div>
      </Col>
      <Col span={7}>
        <Table className='table-material' columns={columns} scroll={{ x: 'max-content', y: 680 }} rowKey={'Specs'} dataSource={materialDemandList} pagination={false} />
      </Col>
      <Col span={5} push={2}>
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

};

export default connect((state) => ({ time: state.leftCenter.time }), (dispatch) => ({
  getVirtualmeterList: (payload) => dispatch({ type: 'leftCenter/getVirtualmeterList', payload }),
}))(leftCenter)