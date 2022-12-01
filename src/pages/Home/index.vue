<template>
    <div>
        <TypeNav />

        <ListContainer />
        <Recommend />
        <Rank />
        <Link />
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />

        <Brand />
        <!-- 防抖:就是回城,被打断就要重新来 节流:就是技能CD,CD没好,你用不了技能 -->
    </div>
</template>
<script>
import store from '@/store';
import { mapMutations, mapState } from 'vuex';
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

export default {
    name: 'Home',
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted() {
        // 获取floor数据
        this.$store.dispatch('getFloorList');
        // 获取用户信息，在首页展示  ==》放到路由前置守卫了
        // this.$store.dispatch('getUserInfo');
    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList,
        }),
    },
};
</script>

<style></style>
