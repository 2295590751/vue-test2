import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';

// 二级路由
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            },
        ],
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true },
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: true },
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { show: true },
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true },
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true },
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true },
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true },
    },
    {
        path: '/login',
        component: Login,
        meta: { show: true },
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
    },
];
