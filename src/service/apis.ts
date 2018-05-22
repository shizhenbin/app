// 区分生产环境和测试环境接口地址
  const API_PREFIX = '/api';
  //const API_PREFIX = 'https://store.gfgroup.com.hk/api';

export const apis = {
  login: () => `${API_PREFIX}/login`, //登录接口
};
