import { reqAddressInfo, reqOrderInfo } from '@/api';
const state = {
    address: [],
    orderInfo: {},
};
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address;
        // console.log(state);
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
};
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        // console.log(result, 11);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
        }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        // console.log(result, 22);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
