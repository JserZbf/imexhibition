import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import './index.less'

import LeftTop from '../leftTop/index'
import LeftCenter from '../leftCenter/index'
import LeftBottom from '../leftBottom/index'
import RightTop from '../rightTop/index'
import RightCenter from '../rightCenter/index'
import RightBottom from '../rightBottom/index'
const Home = function (props) {
  const [allData, setAllData] = useState({});
  const [materialTypeSixList, setMaterialTypeSixList] = useState([]);
  const [rightBottomInfor, setRightBottomInfor] = useState({});
  const [finishPlanObj,setFinishPlanObj]=useState({});
  const [diffAlgorithm,setDiffAlgorithm]=useState({})
  useEffect(() => {
    const obj = {
      "taskId": "202205251042350001",
      "scheduleTarget": 1,
      "schedulePattern": 2,
      "scheduleCycle": 7,
      "orderDetail": [
        {
          "planNO": "2022051021330739627200001",
          "productName": "12M33机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-16"
        },
        {
          "planNO": "2022051021330742024300002",
          "productName": "8M33机体",
          "productNum": 8,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742123900003",
          "productName": "WP3H机体",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742223800004",
          "productName": "P15NG机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742323800005",
          "productName": "P8H国六缸盖",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742423300006",
          "productName": "16M33总成",
          "productNum": 4,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742523100007",
          "productName": "WP8机体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742718700008",
          "productName": "P11机体",
          "productNum": 6,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742822500009",
          "productName": "WP13H缸盖",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330742922000010",
          "productName": "46吨阀体",
          "productNum": 2,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743021600011",
          "productName": "P8GH机体",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743121700012",
          "productName": "H2缸盖吕框架",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 2,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743221200013",
          "productName": "H2缸盖",
          "productNum": 1,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743320800014",
          "productName": "P11H机体",
          "productNum": 6,
          "planType": "产品加工",
          "planLevel": 0,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-12"
        },
        {
          "planNO": "2022051021330743420600015",
          "productName": "P8H机体",
          "productNum": 7,
          "planType": "产品加工",
          "planLevel": 1,
          "planStart": "2022-05-10",
          "planEnd": "2022-05-13"
        }
      ]
    }
    props.getAllData(obj).then(res => {
      setAllData(res);
      setMaterialTypeSixList(res.materialDemandList.slice(0, 6));//物料类型六个卡片
      setRightBottomInfor(res.deviceStatisticsInfo.deviceUseStatistics);//右下角信息
      setFinishPlanObj(res.orderStatisticsInfo.orderFinishStatistics);//计划完成率相关信息
      setDiffAlgorithm(res.orderStatisticsInfo.algorithmComparisonData)//不同算法对比信息
    })
  }, [])
  return <div className='wrap'>
    <Row>
      <Col span={8}>
        <LeftTop />
        <LeftCenter materialDemandList={allData.materialDemandList} />
        <LeftBottom allData={allData} finishPlanObj={finishPlanObj} diffAlgorithm={diffAlgorithm} materialTypeSixList={materialTypeSixList} />
      </Col>
      <Col span={8} className='center-middle'>
        <div className='main-title'></div>
        <div className='digitization-title'>
          <div></div>
          <div>
            <p>数字化</p>
            <p>Digitzing</p>
          </div>
        </div>
        <div className='modernization-title'>
          <div></div>
          <div>
            <p>现代化</p>
            <p>MODERNIZATION</p>
          </div>
        </div>
        <div className='left-mess'>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
        </div>
        <div className='right-mess'>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
          <div>•APS系统面向小规模多品种生产车间需求开发，在有限资源下，可快速生成符合订单要求及车间复杂环境的排产方案。</div>
        </div>
      </Col>
      <Col span={8}>
        <RightTop />
        <RightCenter />
        <RightBottom rightBottomInfor={rightBottomInfor} />
      </Col>
    </Row>
  </div>;
};

export default connect((state) => ({ /* allData: state.allData */ }), (dispatch) => ({
  getAllData: (payload) => dispatch({ type: 'page/getAllData', payload }),
})
)(Home)