<template>
    <el-container class="layout-container">
      <!-- 将宽度设置为auto方便设置isCollapse属性让侧边栏收起与展开 -->
      <el-aside width="auto">
        <!-- 渲染组件 -->
        <!-- 使用传递过来的数据 -->
        <app-aside class="aside-menu" :is-collapse = "isCollapse"></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <!--
              class 样式处理
              {
                css类名: 布尔值
              }
              true: 作用类名
              false: 不作用类名
             -->
            <i
              :class = "{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
              }"
              @click="isCollapse = !isCollapse"
            ></i>
            <span>头条后台管理系统</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" src="user.photo" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!-- 组件默认是不识别原生事件的，除非内部做了处理 -->
              <!-- 加一个.native -->
              <el-dropdown-item @click.native="onLayout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 引入组件
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  // 组件注册
  components: {
    AppAside
  },
  data () {
    return {
      user: {}, // 当前用户登录信息
      isCollapse: false // 侧边菜单栏的展开状态 利用父子组件之间的通信
    }
  },
  created () {
    // 组件初始化完之后，获取用户资料
    this.loadUserProfile()
  },
  methods: {
    // 除了登陆接口， 其他任何接口都需要授权才能请求使用
    // 意思是： 除了登陆接口， 其他任何接口都需要提供你的身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onLayout () {
      this.$confirm('确定要退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.el-aside {
  background-color: #D3DCE6
}
.el-header {
  background-color: #B3C0D1
}
.el-main {
  background-color: #E9EEF3
}
.aside-menu {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
