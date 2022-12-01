import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
// 引入仓库
import store from '@/store';
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
//第一个参数：全局组件的名字  第二个参数：那个组件
// 引入element ui 按需
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//引入路由
import router from '@/router';

// 引入插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/images/1.gif';
Vue.use(VueLazyload, {
    loading: atm,
});

Vue.use(VueRouter);

//测试
// import { reqCategoryList } from '@/api';
// reqCategoryList();

// 引入MockServer.js mock数据
import '@/mock/mockServe';
import 'swiper/css/swiper.css';

// 统一接收api 文件夹里面全部请求函数
// 统一引入  对象
import * as API from '@/api';

// 引入自定义插件
import myPlugins from '@/plugin/myPlugins';
Vue.use(myPlugins);
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
    // 注册仓库
    store,
    // 全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
}).$mount('#app');
