<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-aside class="common-aside">
        <SiderBar />
      </el-aside>
      <el-container>
        <el-header class="common-header">
          <Header />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SiderBar from './components/SiderBar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default defineComponent({
    name: 'job-approval',
    components: {
      SiderBar,
      Footer,
      Header,
    },
    setup(){
        return {}
    },
})
</script>
<style scoped lang="scss">
:deep(::-webkit-scrollbar){
  width: 5px!important;
  height: 5px!important;
}
:deep(::-webkit-scrollbar-thumb:hover){
  background-color: rgba(220,223,230,.8) !important; 
}
.common-layout{
  height: 100%;
  .common-header{
    background-color: rgb(33,61,91);
  }
  .common-aside{
    width: 200px;
    height: 100%;
    background: rgb(29,48,67);
  }
}
</style>