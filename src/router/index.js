import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Article from '@/views/Article'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由 layout 有一个子路由，这个名字没有意义
    // 正确的做法是：如果有默认子路由，就不要给父路由起名字
    // name: 'layout',
    component: Layout,
    children: [
      {
        // path为空，会默认作为子路由显示
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'atticle',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫 : 所有页面的导航都会经过这里 守卫页面的导航的
// to 要去的路由信息
// from 来自哪里的路由信息
// next() 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login 校验登录状态
  // 如果没有登录，则跳转到登陆界面
  // 如果登陆了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录状态的登陆状态
  if (to.path !== '/login') {
    if (user) {
      // 以登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录界面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
export default router
