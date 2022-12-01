import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
// 封装游客身份模块，uuid---》生成随机字符串
import { getUUID } from '@/utils/uuid_token';

const state = {
    goodInfo: {},
    // 游客临时身份 getUUID()生成随机数
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    // 将产品加入购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //    加入购物车返回的解构！！！
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
};
const getters = {
    // 当（数据）还没有获取到的时候，得到的数据就是undefined
    // 路径导航简化的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 产品信息简化的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    state,
    actions,
    mutations,
    getters,
};
