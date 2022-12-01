<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
    },
    mounted() {
        // 通知vuex发请求，获取数据
        this.$store.dispatch('categoryList');
    },
};
</script>

<style scoped></style>
