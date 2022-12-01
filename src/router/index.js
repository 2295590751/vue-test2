import VueRouter from 'vue-router';
import Vue from 'vue';
import routes from './routes';

Vue.use(VueRouter);

// 引入store
import store from '@/store';

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

let router = new VueRouter({
    routes,
    // 滚动行为 滚动条在那个位置x: ，y：
    scrollBehavior(to, from, savedPosition) {
        // 代表返回的滚动条在最上面
        return { y: 0 };
    },
});

// 全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
    // to:获取跳转的路由信息--去哪
    // from：获取从哪来信息--从哪来
    // next：放行函数  next()放行   next('/')/next({path:'/'})放行到指令路由   next(false)
    // next();
    // 登录才有token ，未登录没有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        // 登录了，想去登录页
        if (to.path == '/login') next('/home');
        else {
            // 登录，去的不是login【home|search|。。】
            // 为什么在home 外的页面刷新，userInfo 会为空
            if (name) {
                next();
                console.log(222);
            } else {
                // 没有用户信息，派发actions 让仓库存储用户信息再跳转
                try {
                    //    获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了获取不到用户信息，重新登陆
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
        // 这里听我说一次，1.不要将用户信息也放本地存储，因为当用户强制退出没清token和name，加上token过期，路由守卫就会完全报废
        // 1、注意：游客购物车登录后会合并到用户购物车，并清空游客购物车
        // 千万不要将用户信息放到local storage，因为当token过期用户强制退出没取消登录没有清除token，过期token加用户信息，你路由守卫一点用没有了
        // 2.在路由守卫关注三点token有没有，token有没有过期，有没有用户信息
        // 3.当token有，证明用户登录过，我们就看有没有用户信息，没有就请求。
        // 4.当我们请求不到用户信息，证明token无效，我们清除token，跳到登陆页面。
        // 5.如果有token，有用户信息，我们就放行所有页面，如果没有token，那就一定没有用户信息
        // 6.这个时候，我们就是游客，要禁止访问某些页面，比如支付，这就是为什么不能把用户信息放本地存储
    } else {
        // 未登录
        next();
    }
});

export default router;
