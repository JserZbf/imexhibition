import http from './http';

export const login = (params) => {
    return http.post('/api/auth/login', params);
};

export const ssoLogout = () => {};

