import { getOrderData } from 'services/home/home';

export default {
    namespace: 'page',
    state: {
        mess: '12123'
    },
    effects: {
        // * getVirtualmeterList(_, { call, put }) {
        //     try {
        //         const { code, data } = yield call(getVirtualmeterList);
        //         console.log(code, data)
        //     } catch (error) {}
        // },
    },
    reducers: {
        * getOrderData({ payload, callback }, { call, put, select }) {
            try {
                const res = yield call(getOrderData, payload);
                return res;
                //yield put({ type: 'setAllData', result: res })
            } catch (error) {}
        },
    },
};