import store from '@/store';
import axios from 'axios';
// import { config } from 'vue/types/umd';

// 引入进度条---还需引入它的样式
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

let requests = axios.create({
    //配置对象
    //基础对象、发出请求的时候，路径当中会出线api
    baseURL: '/api',
    timeout: 5000,
});
// 请求拦截器
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId），需要和后台老师商量
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    // 进度条开始动
    nprogress.start();
    return config;
});

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        //res:实质就是项目中发请求、服务器返回的数据
        //进度条结束
        nprogress.done();
        return res.data;
        // return Promise.reject(res);
    },
    (err) => {
        alert(err.message);

        return new Promise();
    }
);

export default requests;
