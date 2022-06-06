import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col, Steps, Popover, Table, Tooltip } from 'antd';
const { Step } = Steps;
import './index.less'
import ReactEchartsCom from '../../components/ReactEcharts/index'
const leftCenter = function (props) {
  const { materialDemandList, leftEchartsPieOne, leftEchartsPieTwo, leftEchartsPieThree,
    leftEchartsPieFour, leftEchartsPieInfoOne, leftEchartsPieInfoTwo, leftEchartsPieInfoThree,
    leftEchartsPieInfoFour } = props;
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
        if (record.materialType == 'blank') {
          return '毛坯'
        } else if (record.materialType == 'fixture') {
          return '夹具'
        } else if (record.materialType == 'tray') {
          return '托盘'
        } else if (record.materialType == 'tool') {
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
  const customDotOne = (dot, { status, index }) => (
    <Popover
      content={
        // <span>
        //   step {index} status: {status}
        // </span>
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  const customDotTwo = (dot, { status, index }) => (
    //console.log(dot, status, index, 'dot,status,index)'),
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
  const customDotThree = (dot, { status, index }) => (
    //console.log(dot, status, index, 'dot,status,index)'),
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
  const customDotFour = (dot, { status, index }) => (
    // console.log(dot, status, index, 'dot,status,index)'),
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
          <ReactEchartsCom option={leftEchartsPieOne} />
          <div>
            <ul>
              <li className='title'>
                <span>计划编号</span>
                <Tooltip title={leftEchartsPieInfoOne.planNO}>
                  <span>{leftEchartsPieInfoOne.planNO}</span>
                </Tooltip>

              </li>
              <li className='title'>
                <span>产品名称</span>
                <span>{leftEchartsPieInfoOne.productName}</span>
              </li>
              <li className='title'>
                <span>计划等级</span>
                <span>{leftEchartsPieInfoOne.planLevel}</span>
              </li>
              <li className='title'>状态</li>
              <li className='title-button'>
                <span className={leftEchartsPieInfoOne.state == '加工中' ? 'active' : ''}>加工中</span>
                <span className={leftEchartsPieInfoOne.state == '未加工' ? 'active' : ''}>未加工</span>
                <span className={leftEchartsPieInfoOne.state == '已加工' ? 'active' : ''}>已加工</span>
              </li>
            </ul>
            <Steps className='steps' current={3} progressDot={customDotOne}>
              <Step title="计划开始时间" description={leftEchartsPieInfoOne.planStart} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoOne.planEnd} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoOne.planEnd} />
              <Step title="超期完成时间" description={leftEchartsPieInfoOne.delayMinutes} />
            </Steps>
          </div>
        </div>
        <div className='ehcarts-yield-two'>
          <ReactEchartsCom option={leftEchartsPieTwo} />
          <div>
            <ul>
              <li className='title'>
                <span>计划编号</span>
                <Tooltip title={leftEchartsPieInfoTwo.planNO}>
                  <span>{leftEchartsPieInfoTwo.planNO}</span>
                </Tooltip>
              </li>
              <li className='title'>
                <span>产品名称</span>
                <span>{leftEchartsPieInfoTwo.productName}</span>
              </li>
              <li className='title'>
                <span>计划等级</span>
                <span>{leftEchartsPieInfoTwo.planLevel}</span>
              </li>
              <li className='title'>状态</li>
              <li className='title-button'>
                <span className={leftEchartsPieInfoTwo.state == '加工中' ? 'active' : ''}>加工中</span>
                <span className={leftEchartsPieInfoTwo.state == '未加工' ? 'active' : ''}>未加工</span>
                <span className={leftEchartsPieInfoTwo.state == '已加工' ? 'active' : ''}>已加工</span>
              </li>
            </ul>
            <Steps className='steps' current={3} progressDot={customDotTwo}>
              <Step title="计划开始时间" description={leftEchartsPieInfoTwo.planStart} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoTwo.planEnd} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoTwo.planEnd} />
              <Step title="超期完成时间" description={leftEchartsPieInfoTwo.delayMinutes} />
            </Steps>
          </div>
        </div>
        <div className='ehcarts-yield-three'>
          <ReactEchartsCom option={leftEchartsPieThree} />
          <div>
            <ul>
              <li className='title'>
                <span>计划编号</span>
                <Tooltip title={leftEchartsPieInfoThree.planNO}>
                  <span>{leftEchartsPieInfoThree.planNO}</span>
                </Tooltip>
              </li>
              <li className='title'>
                <span>产品名称</span>
                <span>{leftEchartsPieInfoThree.productName}</span>
              </li>
              <li className='title'>
                <span>计划等级</span>
                <span>{leftEchartsPieInfoThree.planLevel}</span>
              </li>
              <li className='title'>状态</li>
              <li className='title-button'>
                <span className={leftEchartsPieInfoThree.state == '加工中' ? 'active' : ''}>加工中</span>
                <span className={leftEchartsPieInfoThree.state == '未加工' ? 'active' : ''}>未加工</span>
                <span className={leftEchartsPieInfoThree.state == '已加工' ? 'active' : ''}>已加工</span>
              </li>
            </ul>
            <Steps className='steps' current={3} progressDot={customDotThree}>
              <Step title="计划开始时间" description={leftEchartsPieInfoThree.planStart} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoThree.planEnd} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoThree.planEnd} />
              <Step title="超期完成时间" description={leftEchartsPieInfoThree.delayMinutes} />
            </Steps>
          </div>
        </div>
        <div className='ehcarts-yield-four'>
          <ReactEchartsCom option={leftEchartsPieFour} />
          <div>
            <ul>
              <li className='title'>
                <span>计划编号</span>
                <Tooltip title={leftEchartsPieInfoFour.planNO}>
                  <span>{leftEchartsPieInfoFour.planNO}</span>
                </Tooltip>
              </li>
              <li className='title'>
                <span>产品名称</span>
                <span>{leftEchartsPieInfoFour.productName}</span>
              </li>
              <li className='title'>
                <span>计划等级</span>
                <p>{leftEchartsPieInfoFour.planLevel}</p>
              </li>
              <li className='title'>状态</li>
              <li className='title-button'>
                <span className={leftEchartsPieInfoFour.state == '加工中' ? 'active' : ''}>加工中</span>
                <span className={leftEchartsPieInfoFour.state == '未加工' ? 'active' : ''}>未加工</span>
                <span className={leftEchartsPieInfoFour.state == '已加工' ? 'active' : ''}>已加工</span>
              </li>
            </ul>
            <Steps className='steps' current={3} progressDot={customDotFour}>
              <Step title="计划开始时间" description={leftEchartsPieInfoFour.planStart} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoFour.planEnd} />
              <Step title="最晚结束时间" description={leftEchartsPieInfoFour.planEnd} />
              <Step title="超期完成时间" description={leftEchartsPieInfoFour.delayMinutes} />
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