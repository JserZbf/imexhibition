import React, { useEffect,useMemo} from 'react';
import { connect } from 'dva';

const leftModal = function (props) {
    const { fixList, clickFix, modalFlagLeft, closeModalLeft } = props;
    const aaa=useMemo(() => {
        console.log(modalFlagLeft, '123123-123123123')
        return modalFlagLeft;
    }, [])
    console.log(aaa,'aaa-aaa')
    return modalFlagLeft ? <div className='left-modal'>
        <p className='close' onClick={() => { closeModalLeft() }}>×</p>
        <div>
            <p><span>[设备报警]</span><span>海科特-1</span></p>
            <p><span>故障类型:</span><span>切削液惨漏</span></p>
        </div>
        <div>
            <div>
                <p>故障详情:</p>
                <p>订单1008647828/13D配油盘OP010中断</p>
            </div>
            <div>
                <p>故障时间:</p>
                <p>2020-01-04  2:00 p.m.v</p>
            </div>
        </div>
        <div>
            <div>
                <p>预计维修时间</p>
                <p>
                    {
                        fixList.map((item, index) => {
                            return <span key={index} className={item.flag ? 'span-active' : 'span'} onClick={() => { clickFix(item.name) }}>{item.name}</span>
                        })
                    }
                </p>
            </div>
            <div>
                <p>备注</p>
                <p>123123</p>
            </div>
        </div>
        <div>
        </div>
    </div> : '';
};

export default connect()(leftModal);