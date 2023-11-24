import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './permission';

const app = createApp(App);

// 将store、router挂载到全局变量上, 方便使用
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

app.config.globalProperties.$store = useStore();
app.config.globalProperties.$router = useRouter();

app
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app');
