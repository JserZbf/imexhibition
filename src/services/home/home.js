import http from '../http';

export const getOrderData = (params) => {
    return http.post('/sss-imexhibition-aps/getOrderData', params);
};
export const getEditStart = (params) => {
    return http.post('/sss-imexhibition-aps/start', params);
};