import { resolve } from 'path';
export const TARGETS = {
  dev: {
    ems: 'http://ime.sh-smartstate.com.cn',
  },
};
const TARGET = TARGETS[process.env.PROXY_TARGET] || {};
// ref: https://umijs.org/config/
export default {
  proxy: {
    context: (pathname, req) => {
      return req.headers['x-requested-with'] === 'XMLHttpRequest';
    },
    target: TARGET.ems,
    changeOrigin: true,
    ws: true,
    onProxyReqWs: (proxyReq) => {
      proxyReq.setHeader('origin', TARGET.ems);
    },
    secure: false,
    // 需要转发的API前缀
  },
  hash: true,
  antd: {},
  dva: {
    disableModelsReExport: true,
    lazyLoad: true,
  },
  dynamicImport: {
    loading: 'components/Spin',
  },
  title: 'ems',
  headScripts: [
    // header里面插入script脚本
  ].filter((i) => i),
  links: [{ rel: 'stylesheet', href: '//at.alicdn.com/t/font_2681856_f7w2a3gzeb.css' }],
  chainWebpack(config) {
    config.resolve.modules.add(resolve(__dirname, './src'));
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('file-loader');
  },
  define: {
    'process.env.dev': 'Y',
  },
};
