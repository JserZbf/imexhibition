import React, { useEffect } from 'react';
import { connect } from 'dva';

const RightModal = function (props) {
  const { modalFlagRight, closeModalRight } = props;
  return (
    <div className={modalFlagRight ? 'right-modal' : 'right-modal-none'}>
      <span
        className="close"
        onClick={(e) => {
          e.stopPropagation();
          closeModalRight();
        }}
      >
        ×
      </span>
      <div className="content">
        <p>
          <span>测漏设备</span>
          <span>机械手6关节漏油</span>
        </p>
        <p>
          <span>推荐维修方案</span>
          <span>重新固定，加关节油</span>
        </p>
        <p>
          <span>推荐维修记录</span>
          <span>2022/5/13 更换单向阀</span>
        </p>
        <p>
          <span>备件型号与库存</span>
          <span>单向阀16</span>
        </p>
        <p>
          <span>设备电气图纸</span>
          <span>暂无</span>
        </p>
      </div>
    </div>
  );
};

export default connect()(RightModal);
