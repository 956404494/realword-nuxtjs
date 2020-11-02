<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign In' : 'Sign up' }}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages" >
          <template v-for="(messages, field) in errors">
            <li
              v-for="(message, index) in messages"
              :key="index"
            >{{field}} {{message}}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input 
              v-model="user.username"
              class="form-control form-control-lg" 
              type="text"
              required 
              placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input
              v-model="user.email" 
              class="form-control form-control-lg" 
              type="email" 
              required
              placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input
              v-model="user.password" 
              class="form-control form-control-lg" 
              type="password" 
              required minlength="8"
              placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign In' : 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      // 错误信息
      errors: {} 
    }
  },
  methods: {
    async onSubmit () {
      // 捕获错误信息
      try {
        // 发送登录信息给服务器
        const { data } = this.isLogin 
        ? await login({
          user: this.user
        })
        : await register({
          user: this.user
        })
        // console.log(data);

        // 保存用户的登录状态
        // 程序运行期间存储到vuex中 刷新则不见
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失 将数据持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // 不包含详细错误信息
        console.log('请求失败', err);
        // 输出错误 包含返回对象等详细信息
        // console.dir(err)
        // 保存回显错误信息
        this.errors = err.response.data.errors
      }
    }
  },
  head () {
    return {
      // 页面标签内容
      title: `${this.$route.name}`,
    }
  }
}
</script>

<style>

</style>