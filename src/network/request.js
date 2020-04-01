import axios from 'axios';

export function request(config) {
  return new Promise((resolve, reject) => {
    //1.创建axios实例
    const instance1 = axios.create({
      // baseURL: 'http://123.207.32.32:8000/api/h3',
      baseURL: 'http://152.136.185.210:8000/api/h3',
      // baseURL: 'http://106.54.54.237:8000/api/h3',
      timeout: 5000
    });
    //2.axios拦截器
    //2.1请求拦截
    instance1.interceptors.request.use(config => {
      //进行的操作，比如
      //1.config中信息不符合服务器请求要求
      //2.在发送网络请求时希望显示请求图标（正在加载...）
      //3.某些网络请求，比如登陆必须携带一些特殊信息（token),判断
      // console.log(config);
      return config;
    },err => {
      console.log(err);
    });
    //2.2响应拦截
    instance1.interceptors.response.use(res => {
      console.log(res);
      return res.data;
    },err => {
      console.log(err);
    });
    //3.发送网络请求
    instance1(config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
  })
}