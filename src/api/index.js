//当前模块：API统一管理
import requests from './requests';
import MockRequests from './mockAjax';

import axios from 'axios';
//三级联动接口
///api/product/getBaseCategoryList
//发请求
export const reqCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};

//获取banner （home首页轮播图接口）
export const reqGetBannerList = () => MockRequests.get('/banner');

// 获取floor数据
export const reqGetFloorList = () => MockRequests.get('/floor');

// 获取search模块数据 地址：/api/list  情趣方式：post 参相：带参
export const reqGetSearchInfo = (params) =>
    requests({ url: '/list', method: 'post', data: params });
// 应该是http；//localhost：8080/api/api/list
// 请求发出去了但是400错误的检查下路径

// 获取商品详情信息接口  请求地址/api/item/{skuld}   GET
// 相当于封装一个函数。。
export const reqGoodsInfo = (skuId) =>
    requests({ url: `/item/${skuId}`, method: 'get' });

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

// 获取购物车列表数据接口  /api/cart/cartList   get
export const reqCartList = () =>
    requests({ url: '/cart/cartList', method: 'get' });

//删除购物车产品接口  /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId) =>
    requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

// 切换接口选定状态    /api/cart/checkCart/{skuId}/{isChecked}   get
export const reqUpdateCheckedById = (skuId, isChecked) =>
    requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 获取验证码  /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) =>
    requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

// 注册  /api/user/passport/register  post   phone code password
export const reqUserRegister = (data) =>
    requests({ url: '/user/passport/register', method: 'post', data });

//登录   /api/user/passport/login  post   phone passwoord
export const reqUserLogin = (data) =>
    requests({ url: '/user/passport/login ', method: 'post', data });

//获取用户信息 （带着token值向服务器要用户信息）  api/user/passport/auth/getUserInfo    get
export const reqUserInfo = () =>
    requests({ url: '/user/passport/auth/getUserInfo ', method: 'get' });

// 退出登录    /api/user/passport/logout   get
export const reqLogout = () =>
    requests({ url: '/user/passport/logout ', method: 'get' });

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () =>
    requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get',
    });

// 获取商品清单  api/order/auth/trade   get
export const reqOrderInfo = () =>
    requests({ url: '/order/auth/trade', method: 'get' });

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) =>
    requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo} `,
        method: 'post',
        data,
    });

//获取支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) =>
    requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',
    });

//查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}   get
export const reqPayStatus = (orderId) =>
    requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    });

//  获取个人中心的数据 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
    requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get',
    });
