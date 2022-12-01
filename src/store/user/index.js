// 登录与注册

import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout,
} from '@/api';
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GERUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清空本地数据
    CLEARLOGOUT(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN');
    },
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            // console.log(result);
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        // 这不需要三连环、不需要返回数据
        let result = await reqUserRegister(user);
        console.log(result);
        if (result.code == 200) {
            return 'ok';
        }
        // 为什么这里不能有else
        // else {
        //     return Promise.reject(new Error(result.message));
        // }
    },
    // 登录token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        console.log(data);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            localStorage.setItem('TOKEN', result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GERUSERINFO', result.data);
            return 'ok';
        }
        // 小心。。这里加上else会报错
        else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEARLOGOUT');
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
};

const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
};
