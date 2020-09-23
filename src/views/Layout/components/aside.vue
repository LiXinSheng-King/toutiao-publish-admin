<template>
<!-- el-menu-item 的 index 不能重复 -->
   <el-menu
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <!-- router 路由配置 -->
      <el-menu-item index="/">
        <i class="iconfont iconHomehomepagemenu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="article">
        <i class="iconfont iconbook"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="image">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="comment">
        <i class="iconfont iconcomments"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="fans">
        <i class="iconfont icongift"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="settings">
        <i class="iconfont iconSettingscontroloptions"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'], // 父子组件之间的通信，接收父组件传过来的数据
  data () {
    return {
      // isCollapse: true
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.iconfont {
  margin-right: 10px;
}
</style>
