<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(item, i) in messages" :key="i">
                {{ field }}:{{ item }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="Submit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/login'
// 这个必须是在客户端进行登录的
// 这里主要是为了在服务端不加载这个包
// 为了持久话，将token设置到cookie中
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
      },
      errors: {},
    }
  },
  methods: {
    async Submit() {
      try {
        const { data } = await api[this.isLogin ? 'login' : 'register'](
          this.user
        )
        console.log(data)
        this.$store.commit('setUser', data.user)

        Cookie.set('user', JSON.stringify(data.user))
        // todo: 保存到当前用户
        this.$router.push('/')
      } catch (err) {
        // console.dir(err)
        this.errors = err.response.data.errors
      }
    },
  },
}
</script>

<style scoped></style>
