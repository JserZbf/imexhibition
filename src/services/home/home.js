import http from '../http';

export const getVirtualmeterList = (params) => {
  return http.get('/api/main/virtualmeter/list', params);
};
