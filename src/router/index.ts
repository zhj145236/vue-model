import { createRouter, createWebHashHistory , RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 不需要鉴权的数据
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    meta: { title: '' },
    redirect: '/myText1/my-text-one',
    children: [{
      path: '/myText1/my-text-one',
      component: () => import('@/views/myText1/my-text-one.vue'),
      meta:{title: 'MyTextOne'},
    },{
      path: '/myText2/my-text-two',
      component: () => import('@/views/myText2/my-text-two.vue'),
      meta:{title: 'MyTextTwo'},
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登陆页' },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: { title: '404' },
    component: () => import('@/views/error-page/404.vue')
  }
]

// 需要鉴权的数据
export const asyncRoutes = [
  // 其它路由页面的配置
  {
    path: '/myText1',
    component: Layout,
    name: '测试1',
    meta: {
      title: '',
      icon: '',
      breadcrumb: 'myText1_web', // 动态生成面包屑导航
      requiresAuth: true, // 权限控制
      defaultActive: '/myText1/my-text-one', // 进入路由后默认加载的页面
    },
    children: [{
      path: '/myText1/my-text-one',
      component: () => import('@/views/myText1/my-text-one.vue'),
      name: '测试1-1',
      meta: {
        title: '',
        icon: '',
        breadcrumb: 'my-text-one_web', // 动态生成面包屑导航
        requiresAuth: true, // 权限控制
        defaultActive: '', // 进入路由后默认加载的页面
      }
    }],
  },
  
  {
    path: '/myText2',
    component: Layout,
    name: '测试2',
    meta: {
      title: '',
      icon: '',
      breadcrumb: '', // 动态生成面包屑导航
      requiresAuth: true, // 权限控制
      defaultActive: '', // 进入路由后默认加载的页面
    },
    children: [{
      path: '/myText2/my-text-two',
      component: () => import('@/views/myText2/my-text-two.vue'),
      name: '测试2-1',
      meta: {
        title: '',
        icon: '',
        breadcrumb: 'my-text-two_web', // 动态生成面包屑导航
        requiresAuth: true, // 权限控制
        defaultActive: '', // 进入路由后默认加载的页面
      }
    }],
  },

]

const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHashHistory(),	 // 使用hash模式
  routes
})

export default router