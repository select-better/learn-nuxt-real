/**
 * nuxt 的配置
 * */

module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      console.log(routes)
      // 清空数组
      routes.splice(0)
      // routes.push({
      //   name: 'hello',
      //   path: '/hello',
      //   component: resolve(__dirname, './pages/about.vue'),
      // })
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/index.vue'),
            children: [
              // 子组件
              {
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/home/index.vue'),
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/index.vue'),
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/index.vue'),
              },
              {
                path: '/profile/:id',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/index.vue'),
              },
              {
                path: '/set',
                name: 'set',
                component: resolve(__dirname, 'pages/set/index.vue'),
              },
              {
                path: '/article',
                name: 'article',
                component: resolve(__dirname, 'pages/article/index.vue'),
              },
              {
                path: '/detail/:slug',
                name: 'detail',
                component: resolve(__dirname, 'pages/detail/index.vue'),
              },
            ],
          },
        ]
      )
    },
  },
  // modules: ['@nuxtjs/proxy'],
  // axios: {
  //   proxy: true,
  // },
  // proxy: {
  //   '/aa': {
  //     changeOrigin: 'true',
  //     target: 'https://conduit.productionready.io',
  //     ws: true,
  //     pathRewrite: {
  //       '^/aa': '',
  //     },
  //   },
  // },
  server: {
    host: '0.0.0.0', // 适用生产  在dev的时候是本地地址，
    port: 3000,
  },
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
}
