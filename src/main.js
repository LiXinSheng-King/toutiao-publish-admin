
// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

// 创建Vue根实例
// 把router 配置到根实例
// 通过 render方法把App根组件渲染到 #app入口节点
new Vue({
  router,
  store,
  render: h => h(App)
// el:'#app' 等价于 $mount('app')
}).$mount('#app')
