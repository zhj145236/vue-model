import router from './router/index.ts'
import createRoutes from './router/router.ts'
import store from './store/index.ts';
import { onMounted , nextTick } from 'vue';
let isRoutesAdded = false;


// 将导航守卫定义为函数，以便后续解绑
const dynamicRouteGuard = async (to:any, from:any, next:any) => {
    await nextTick();
    console.log(from,'from')
    let getUserInfo:any = localStorage.getItem('userInfo');
    if(getUserInfo){
        if(to.path === '/home'){
            next({path: '/'});
        }else{
            if(!isRoutesAdded){
                try {
                    // 这里可以用 await 配合请求后台数据来生成路由
                    // const data = await axios.get('xxx')
                    // const routes = createRoutes(data)
                    // 把模拟的菜单数据格式放到store，此处需要后台返回
                    const routes = await createRoutes();
                    // 动态添加路由
                    routes.forEach((route:any) => {
                        // console.log(route,'route12')
                        router.addRoute(route);
                    });
                    store.commit('setRoutesAdded',true);
    
                    // 解绑导航守卫，以免陷入死循环
                    onMounted(() => {
                        router.beforeEach(dynamicRouteGuard);
                    });
                    next({ path: to.path || '/' });
                } catch (error) {
                    next();
                } 
            }else{
                next();
            }
        }
    }else{
        if(to.path === '/login'){
            next();
        }else{
            next({path: '/login'})
        }
    }
}

router.beforeEach(dynamicRouteGuard)



