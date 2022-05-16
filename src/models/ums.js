import { login } from 'services/umsApi';

export default {
    namespace: 'ums',
    state: {
        userInfo: {},
        mess: 'ums.js'
    },
    subscriptions: {
        setUp() {},
    },
    effects: {
        * userLogin({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(login, payload);
                console.log(code, data)
                if (code === 200) {
                    localStorage.setItem('sss_token', data.access_token);
                    localStorage.setItem('menu', JSON.stringify(data.menu_list));
                    yield put({
                        type: 'save',
                        payload: {
                            userInfo: data,
                        },
                    });
                }
            } catch (error) {
                yield put({
                    type: 'save',
                    payload: {
                        userInfo: [],
                    },
                });
            }
        },
        * ssoLogout() {
            // 登出逻辑
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