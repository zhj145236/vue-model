<template>
    <div>
        <span class="set-span"><div><img src="../../images/jeff.jpg" /></div><p>Jeff框架搭建</p></span>
        <el-menu
            v-if="currentRoute.length > 0"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
        >
            <template v-for="item in currentRoute">
                <el-sub-menu :index="item.path">
                    <!-- 一级路由 -->
                    <template #title>
                        <el-icon></el-icon>
                        <span>{{item.name}}</span>
                    </template>

                    <!-- 二级路由 -->
                    <template v-if="item.children && item.children.length !== 0" v-for="cItem in item.children">
                        <el-menu-item-group>
                            <el-menu-item :index="cItem.path" @click="handleMenuItemClick(cItem.path)">{{cItem.name}}</el-menu-item>
                        </el-menu-item-group>
                    </template>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent , ref , toRaw , watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter , useRoute } from 'vue-router';
export default defineComponent( {
    name: 'SiderBar',
    components: {  },
    setup(){
        const isCollapse = ref(false);
        const handleOpen = () => {};
        const handleClose = () => {};
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const getRoute = store.state.currentRoute;
        const currentRoute = getRoute.filter((item:any) => {
            return item.path !== '*' && item.redirect !== '/404';
        });
        const defaultActive = ref('');
        const handleMenuItemClick = (path:string) => {
            router.push(path);
        }

        watch(() => toRaw(route).path,(newValue) => {
            if (newValue.length > 0) {
                defaultActive.value = toRaw(route).path;
            }
        });

        if(toRaw(route).path !== ''){
            defaultActive.value = toRaw(route).path;
        }
        return {
            isCollapse,
            handleOpen,
            handleClose,
            currentRoute,
            defaultActive,
            handleMenuItemClick,
        }
    },
} )
</script>
<style scoped lang="scss">
.set-span{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgb(33, 61, 91);
    padding-left: 10px;
    p{
        display: block;
        font-size: 16px;
        font-weight: 600;
        margin-left: 10px;
    }
    div{
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 100px;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
:deep(.el-menu){
    background-color: rgba(255,255,255,0);
    span,i{
        color: #FFFFFF;
    }
}
:deep(.el-sub-menu__title):hover{
    background-color: rgba(24,34,44,1);
}
:deep(.el-menu-item):hover{
    background-color: rgba(24,34,44,1);
}
:deep(.el-menu-item,.is-active){
    color: #E5EAF3;
}
</style>