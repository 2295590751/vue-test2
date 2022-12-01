<template>
    <div>
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName">
                            {{ searchParams.categoryName
                            }}<i @click="removeCategoryName">×</i>
                        </li>
                        <!-- 关键字面包屑 -->
                        <li class="with-x" v-if="searchParams.keyword">
                            {{ searchParams.keyword
                            }}<i @click="removeKeyword">×</i>
                        </li>
                        <!-- 品牌面包屑 -->
                        <li class="with-x" v-if="searchParams.trademark">
                            {{ searchParams.trademark.split(':')[1]
                            }}<i @click="removeTrademark">×</i>
                        </li>
                        <!-- 属性面包屑 -->
                        <li
                            class="with-x"
                            v-for="(attrvalue, index) in searchParams.props"
                            :key="index"
                        >
                            {{ attrvalue.split(':')[2]
                            }}<i @click="removeAttr(index)">×</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <!-- 子组件发数据时调用的方法名=“父组件接收数据的方法名” -->
                <SearchSelector
                    @trademarkInfo="trademarkInfo"
                    @attrInfo="attrInfo"
                />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-i nner filter">
                            <!-- 排序的解构 -->
                            <ul class="sui-nav">
                                <li
                                    :class="{ active: isOne }"
                                    @click="changeOrder('1')"
                                >
                                    <a
                                        >综合<span
                                            v-show="isOne"
                                            class="iconfont"
                                            :class="{
                                                'icon-long-arrow-up': isAsc,
                                                'icon-long-arrow-down': isDesc,
                                            }"
                                        ></span
                                    ></a>
                                </li>
                                <li
                                    :class="{ active: isTwo }"
                                    @click="changeOrder('2')"
                                >
                                    <a
                                        >价格<span
                                            v-show="isTwo"
                                            class="iconfont"
                                            :class="{
                                                'icon-long-arrow-up': isAsc,
                                                'icon-long-arrow-down': isDesc,
                                            }"
                                        ></span
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 产品销售列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li
                                class="yui3-u-1-5"
                                v-for="good in goodsList"
                                :key="good.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${good.id}`">
                                            <!-- <img v-lazy="good.defaultImg" /> -->
                                            <img :src="good.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ good.price }}.00</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            target="_blank"
                                            href="item.html"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                                            >{{ good.title }}</a
                                        >
                                    </div>
                                    <div class="commit">
                                        <i class="command"
                                            >已有<span>2000</span>人评价</i
                                        >
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a
                                            href="javascript:void(0);"
                                            class="sui-btn btn-bordered"
                                            >收藏</a
                                        >
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 -->
                    <Pagination
                        :pageNo="searchParams.pageNo"
                        :pageSize="searchParams.pageSize"
                        :total="total"
                        :continues="5"
                        @getPageNo="getPageNo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters, mapState } from 'vuex';
export default {
    name: 'search',
    components: {
        SearchSelector,
    },
    data() {
        return {
            // 带给服务器参数
            searchParams: {
                // 一级分类id
                category1Id: '',
                category2Id: '',
                category3Id: '',
                categoryName: '',
                // 关键字
                keyword: '',
                // 排序
                order: '1:desc',
                // 分页器用的，代表的是第几页
                pageNo: 1,
                // 每页展示的数据个数
                pageSize: 10,
                // 平台售卖属性操作带的参数
                props: [],
                // 品牌
                trademark: '',
            },
        };
    },

    computed: {
        ...mapGetters({ goodsList: 'goodsList' }),
        // 也可
        // ...mapGetters(['goodsList']),
        isOne() {
            return this.searchParams.order.indexOf('1') != -1;
        },
        isTwo() {
            return this.searchParams.order.indexOf('2') != -1;
        },
        isAsc() {
            return this.searchParams.order.indexOf('asc') != -1;
        },
        isDesc() {
            return this.searchParams.order.indexOf('desc') != -1;
        },
        ...mapState({
            total: (state) => state.search.searchList.total,
        }),
    },
    beforeMount() {
        // 复杂写法
        // this.searchParams.caragory1Id = this.$route.query.category1Id;
        // this.searchParams.caragory2Id = this.$route.query.category2Id;
        // this.searchParams.caragory3Id = this.$route.query.category3Id;
        // this.searchParams.caragoryName = this.$route.query.categoryName;
        // this.searchParams.keyword = this.$route.params.keyword;

        // 合并
        // 将this.$route.query 数据合并到searchParams中
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
    },
    mounted() {
        this.getData();
    },
    methods: {
        //封装成方法，可以多次向服务器发请求。挂载就只有一次！
        getData() {
            // this.$store.dispatch('getSearchList', {});
            this.$store.dispatch('getSearchList', this.searchParams);
        },
        //删除分类名字
        removeCategoryName() {
            // 将服务器数据caregoryName置空了，还需更新页面
            this.searchParams.categoryName = undefined;
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            this.getData();
            if (this.$route.params) {
                this.$router.push({
                    name: 'search',
                    params: this.$route.params,
                });
            }
        },
        // 删除关键字
        removeKeyword() {
            this.searchParams.keyword = undefined;
            this.getData();
            // 通知兄弟组件（header）删除关键字
            this.$bus.$emit('clear');
            // 进行路由跳转
            // this.$route.query是一个对象，所以，无论是什么，都为true
            if (this.$route.query) {
                this.$router.push({ name: 'search', query: this.$route.query });
            }
        },
        // 自定义事件回调
        trademarkInfo(trademark) {
            console.log('我是trademark', trademark);
            // 模板字符串
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            this.getData();
        },
        removeTrademark() {
            this.searchParams.trademark = undefined;
            this.getData();
        },
        attrInfo(attr, attrvalue) {
            //  console.log(attr.attrName, attr.attrId, attrvalue);
            let props = `${attr.attrName}:${attr.attrId}:${attrvalue}`;

            //    数组查重  indexOf（要查的数），查到了，返回数组的下标，没有，返回-1
            // 返回-1 ，说明没找到一一样的数组
            if (this.searchParams.props.indexOf(props) == -1) {
                this.searchParams.props.push(props);
            }

            this.getData();
        },
        removeAttr(index) {
            // 删除数组和删除数据不太一样  错误写法：this.searchParams.props[index] = '';
            this.searchParams.props.splice(index, 1);
            this.getData();
        },
        changeOrder(flag) {
            // 形参，代表传入的是1综合 2价格
            let originOrder = this.searchParams.order;
            let originFlag = this.searchParams.order.split(':')[0];
            let originSort = this.searchParams.order.split(':')[1];
            let newOrder = '';
            //点击综合
            if (flag == originFlag) {
                newOrder = `${originFlag}:${
                    originSort == 'desc' ? 'asc' : 'desc'
                }`;
            } else {
                newOrder = `${flag}:${'desc'}`;
            }
            this.searchParams.order = newOrder;
            this.getData();
        },
        // 自定义点击页码
        getPageNo(pageNo) {
            this.searchParams.pageNo = pageNo;
            this.getData();
        },
    },
    watch: {
        $route(newValue, oldValue) {
            Object.assign(
                this.searchParams,
                this.$route.query,
                this.$route.params
            );
            this.getData();
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;

                .sui-pagination {
                    margin: 18px 0;

                    ul {
                        margin-left: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                        width: 490px;
                        float: left;

                        li {
                            line-height: 18px;
                            display: inline-block;

                            a {
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                border: 1px solid #e0e9ee;
                                margin-left: -1px;
                                font-size: 14px;
                                padding: 9px 18px;
                                color: #333;
                            }

                            &.active {
                                a {
                                    background-color: #fff;
                                    color: #e1251b;
                                    border-color: #fff;
                                    cursor: default;
                                }
                            }

                            &.prev {
                                a {
                                    background-color: #fafafa;
                                }
                            }

                            &.disabled {
                                a {
                                    color: #999;
                                    cursor: default;
                                }
                            }

                            &.dotted {
                                span {
                                    margin-left: -1px;
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    font-size: 14px;
                                    border: 0;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                            }

                            &.next {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                        }
                    }

                    div {
                        color: #333;
                        font-size: 14px;
                        float: right;
                        width: 241px;
                    }
                }
            }
        }
    }
}
</style>
