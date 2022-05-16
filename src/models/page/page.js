import { getVirtualmeterList } from 'services/home/home';
export default {
    namespace: 'page',
    state: {
        time: 'skr'
    },
    effects: {
        * getVirtualmeterList(_, { call, put }) {
            try {
                const { code, data } = yield call(getVirtualmeterList);
                console.log(code, data)
            } catch (error) {}
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
};