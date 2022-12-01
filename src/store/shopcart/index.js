import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },
};
const actions = {
    // 获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            // console.log(result, 111);
            commit('GETCARTLIST', result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);

        // 什么时候要用到三连环？？？这不用？
        if (result.code == 200) {
            return 'ok';
        } else {
            // promise 还是有点不明白
            return Promise.reject(new Error('fail'));
        }
    },
    // 修改购物车某个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            // promise 还是有点不明白
            return Promise.reject(new Error('fail'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = [];
        // 遍历购物车中的全部产品
        getters.cartList.cartInfoList.forEach((item) => {
            let promise =
                item.isChecked == 1
                    ? dispatch('deleteCartListBySkuId', item.skuId)
                    : '';
            // !!!!!
            PromiseAll.push(promise);
        });
        // 只要全部的p1 |p2 .。。都成功，返回结果即为成功
        // 如果有一位失败，返回结果为失败
        return Promise.all(PromiseAll);
    },
    // 修改全部产品状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // 数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', {
                skuId: item.skuId,
                isChecked,
            });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
};

const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
};
export default {
    state,
    actions,
    mutations,
    getters,
};
