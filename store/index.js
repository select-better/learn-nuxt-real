// 当请求后，服务端将cookie中的数据提取出来，解析给库中
const cookieparser = process.server ? require('cookieparser') : undefined
// state存储当前用户的信息
export const state = () => {
  return {
    user: null,
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // nuxt会出实话，将数据返回前端，前端就一直有了
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  },
}
