<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/article">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/set">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login"> Sign in </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register"> Sign up </nuxt-link>
          </li>
          <li class="nav-item" v-if="user">
            <nuxt-link class="nav-link" to="/profile/1">
              <img
                :src="user.image"
                style="width: 20px; height: 20px; border-radius: 50%"
              />
              {{ user.username }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://kaiwu.lagou.com/">lagou</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/login'
export default {
  name: 'Layout',
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    const Cookies = process.client ? require('js-cookie') : undefined
    Cookies.set('aa', { a: 1 })
  },
}
</script>

<style></style>
