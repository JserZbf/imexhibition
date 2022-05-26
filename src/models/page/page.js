import { getAllData } from 'services/home/home';
export default {
    namespace: 'page',
    state: {
        allData: {}
    },
    reducers: {
        setAllData(state, action) {
            const result = action.result
            return {
                ...state,
                allData: result
            }
        },
    },
    effects: {
        * getAllData({ payload, callback }, { call, put, select }) {
            try {
                const res = yield call(getAllData, payload);
                return res;
                //yield put({ type: 'setAllData', result: res })
            } catch (error) {}
        },
    }
};