import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import trade from './trade';

export default new Vuex.Store({
    // 模块化开发的小仓库存储数据{
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    },
});
