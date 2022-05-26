import { getVirtualmeterList } from 'services/home/home';
export default {
    namespace: 'leftCenter',
    state: {
        time: 'skr123123'
    },
    effects: {
        * getVirtualmeterList(_, { call, put }) {
            try {
                const { code, data } = yield call(getVirtualmeterList);
                console.log(code, data)
            } catch (error) {}
        },
        * setMess({ payload }, { call, put }) {
            // try {
            //     const { code, data } = yield call(login, payload);
            //     console.log(code, data)
            //     if (code === 200) {
            //         localStorage.setItem('sss_token', data.access_token);
            //         localStorage.setItem('menu', JSON.stringify(data.menu_list));
            yield put({
                type: 'setMessM',
                payload: payload
            });
            // }
            // } catch (error) {
            //     yield put({
            //         type: 'save',
            //         payload: {
            //             userInfo: [],
            //         },
            //     });
            // }
        },
        * setMess({ payload }, { call, put }) {
            // try {
            //     const { code, data } = yield call(login, payload);
            //     console.log(code, data)
            //     if (code === 200) {
            //         localStorage.setItem('sss_token', data.access_token);
            //         localStorage.setItem('menu', JSON.stringify(data.menu_list));
            yield put({
                type: 'setMessM',
                payload: payload
            });
            // }
            // } catch (error) {
            //     yield put({
            //         type: 'save',
            //         payload: {
            //             userInfo: [],
            //         },
            //     });
            // }
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        setMessM(state, action) {
            return {
                ...state,
                mess: action.payload
            };
        },
    },
};