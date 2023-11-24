import { asyncRoutes } from './index.ts'
import store from '../store'
import 'nprogress/nprogress.css'   // 导入样式，否则看不到效果

// 将菜单信息转成对应的路由信息 动态添加
const createRoutes = () => {
    // 进行菜单过滤
    const accessedRoutes = filterAsyncRoutes(asyncRoutes);
    // 最后添加404页面 否则会在登陆成功后跳到404页面
    accessedRoutes.push({ path: '*', redirect: '/404' });
    store.commit('setCurrentRoute',accessedRoutes);
    return accessedRoutes;
}

// 递归过滤异步路由表， 返回符合用户角色权限的路由表
const filterAsyncRoutes = (routes:any) => {
    const res:any = []
  
    routes.forEach((route:any) => {
      const tmp = {
        ...route
      }
      if (hasPermission(tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children)
        }
        res.push(tmp)
      }
    })
    return res
  }

// 通过meta.requiresAuth判断是否与当前用户权限匹配
const hasPermission = (route:any) => {
    if (route.meta && route.meta.requiresAuth){
      return route.meta.requiresAuth
    } else {
      return false
    }
}
export default createRoutes;