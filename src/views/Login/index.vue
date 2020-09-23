<template>
  <div class="login-container">
    <!--
      配置form表单验证
      1：必须给 el-form 组件绑定 model 为表单数据对象
      2: 给需要的表单项 el-form-item 绑定 prop 属性
         注意： prop 属性需要指定表单对象中的数据名称
      3：通过 el-form 组件的 rules 属性配置验证规则

      手动触发表单验证：
      1：给 el-form 设置 ref 起个名字
      2：通过 ref 获取 el-form 组件 ，调用组件的 validate 进行验证
     -->
    <el-form ref="form-Ref" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" prefix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" prefix-icon="el-icon-coin"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我以阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" :loading="loginLoading">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录的loading状态
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过： callback()
            // 验证失败： callback(new Error('错误信息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user

      // 表单验证
      // validate 方法是异步的
      this.$refs['form-Ref'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过，提交表单
        this.login()
      })
    },
    login () {
      // 开启登陆中 loading....
      this.loginLoading = true

      // 对于代码中的请求操作
      // 1：接口请求可能需要重用
      // 2：实际工作中，接口非常容易变动，改起来麻烦
      // 建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
      // 好处是： 管理维护更方便 ，也好重用

      // this.user 是实参
      login(this.user).then(res => { // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false

        // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
        // 本地存储只能存储字符串
        // 如果需要存储对象，数组类型的数据，则把他们转换为JSON格式字符串进行存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 打印请求之后的返回结果
        console.log(res)

        // 跳转到首页
        // this.$router.push('/')
        // 方法二
        // 路由中的name 可以实现路由跳转
        // 组件中name 可以通过vue工具能够通过name很好的查看当前组件的内容
        this.$router.push({
          name: 'home'
        })
      })
        .catch(err => { // 登录失败
          this.$message.error('登录失败，手机号或验证码错误')
          console.log('登陆失败', err)
          this.loginLoading = false
        })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/login_bg.jpg') no-repeat
}
.el-form {
  background-color: #fff;
  padding: 50px;
  width: 300px;
}
.el-button {
  width: 100%;
}
</style>
