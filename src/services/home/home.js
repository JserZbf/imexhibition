import http from '../http';

export const getVirtualmeterList = (params) => {
  return http.get('/sss-imexhibition-aps/getMaterialInfo', params);
};
export const getAllData = (params) => {
  return http.post('/sss-imexhibition-aps/start', params);
};
export const getQuery = (params) => {
  return http.post('/sss-imexhibition-aps/query', params);
};
