<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="cart in cartInfoList"
                    :key="cart.id"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cart.isChecked == 1"
                            @change="updateChecked(cart, $event)"
                        />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" />
                        <div class="item-msg">
                            {{ cart.skuName }}
                        </div>
                    </li>

                    <li class="cart-list-con4">
                        <span class="price">{{ cart.skuPrice }}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            href="javascript:void(0)"
                            class="mins"
                            @click="handler('minus', -1, cart)"
                            >-</a
                        >
                        <input
                            autocomplete="off"
                            type="text"
                            minnum="1"
                            class="itxt"
                            :value="cart.skuNum"
                            @change="
                                handler('change', $event.target.value * 1, cart)
                            "
                        />
                        <a
                            href="javascript:void(0)"
                            class="plus"
                            @click="handler('add', 1, cart)"
                            >+</a
                        >
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{
                            cart.skuPrice * cart.skuNum
                        }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a
                            href="#none"
                            class="sindelet"
                            @click="deleteCartById(cart)"
                            >删除</a
                        >
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllCheck && cartInfoList.length > 0"
                    @change="updateAllCartChecked($event)"
                />
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>0</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" @click="$router.push('/trade')">结算</a>
                </div>
            </div>
        </div>
    </div>
    <!-- 节流多数用在服务器与前端页面交互的地方  防抖则多用于前端事件触发频繁的地方 -->
</template>

<script>
import { mapGetters } from 'vuex';
// 节流
import throttle from 'lodash/throttle';
export default {
    name: 'ShopCart',
    mounted() {
        this.getData();
    },
    methods: {
        // 获取个人购物车数据
        getData() {
            this.$store.dispatch('getCartList');
        },
        // +  - 的时候进行节流操作
        handler: throttle(async function (type, disNum, cart) {
            // type :为了区分这三个元素
            // disNum形参：+变化量（1）  -变化量（-1） input 最终数 ，不是变化量
            // cart：哪个产品id

            switch (type) {
                //加号
                case 'add':
                    disNum = 1;

                    break;
                // 减号
                case 'minus':
                    // 如果个数小于1，传递给服务器的数为0
                    disNum = cart.skuNum > 1 ? -1 : 0;
                    break;

                // input框
                case 'change':
                    // 输入，非法（带汉字，为负数），带给服务器的为0
                    if (isNaN(disNum) || disNum < 1) {
                        disNum = 0;
                    } else {
                        disNum = parseInt(disNum) - cart.skuNum;
                    }
                    break;
            }
            try {
                // ??????如何传递数据给服务器并修改数据的呢！！！
                // ！！！他是将服务器传入到vuex中的数据，直接把需要获取的数改完后给你！！！
                await this.$store.dispatch('addOrUpdateShopCart', {
                    skuId: cart.skuId,
                    skuNum: disNum,
                });
                this.getData();
            } catch (error) {}
        }, 500),
        async deleteCartById(cart) {
            try {
                await this.$store.dispatch('deleteCartListBySkuId', cart.skuId);
                this.getData();
            } catch (error) {
                // alert(error.message);
                console.log(error.message);
            }
        },
        // 修改产品的勾选状态
        updateChecked(cart, event) {
            // 带给服务器的参数isChecked， 不是布尔值，应该是0|1
            let isChecked = event.target.checked ? '1 ' : '0';
            try {
                // 这里直接传一个数过去，不是更直接嘛，用解构赋值干啥！！---传的是对象，不仅要value，还要key
                this.$store.dispatch('updateCheckedById', {
                    skuId: cart.skuId,
                    isChecked,
                });
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
        // 删除全部选中的
        async deleteAllCheckedCart() {
            try {
                await this.$store.dispatch('deleteAllCheckedCart');
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
        // 修改全部选中状态
        async updateAllCartChecked(event) {
            try {
                let isChecked = event.target.checked ? '1' : '0';
                // 派发action
                await this.$store.dispatch('updateAllCartIsChecked', isChecked);
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
    },
    computed: {
        ...mapGetters(['cartList']),
        // 购物车数据
        cartInfoList() {
            return this.cartList.cartInfoList || [];
        },
        // 计算机购买产品的总价
        totalPrice() {
            let sum = 0;
            this.cartInfoList.forEach((item) => {
                sum += item.skuPrice * item.skuNum;
            });
            return sum;
        },
        // 判断底部复选框是否勾选
        isAllCheck() {
            // 原理：遍历数组，只要全部元素isChecked全为1===》真
            // 只要一个不是1 ，为假
            return this.cartInfoList.every((item) => item.isChecked == 1);
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: 'Microsoft YaHei';
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
