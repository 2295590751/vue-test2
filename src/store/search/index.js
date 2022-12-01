// search小仓库
import { reqGetSearchInfo } from '@/api';

const state = {
    // 现在这是undefined，没进去
    searchList: [],
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    // 获取search 模块数据
    async getSearchList({ commit }, searchParams) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：事当用户激发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(searchParams);
        // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    },
};

const getters = {
    goodsList(state) {
        // 无网，是防止无数据就遍历的情况
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
};
export default {
    name: 'Search',
    namespace: true,
    state,
    mutations,
    actions,
    getters,
};
