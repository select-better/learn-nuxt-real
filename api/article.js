import { request } from '@/plugins/request'

// 文章
export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params,
  })
}

// 文章
export const getFeedArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    params,
    // headers: {
    //   authorization:
    //     'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjI2OTU2OTYwNjBAcXEuY29tIiwidXNlcm5hbWUiOiJ3Y2wiLCJpYXQiOjE2NTI5NzgyNDUsImV4cCI6MTY1ODE2MjI0NX0.f6SYT3I0UvSEYQzem5-rOfwehUHt3htJadzcnleRxBA',
    // },
  })
}

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST',
  })
}

// 去掉点赞
export const removeFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE',
  })
}

// 获取数据
export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET',
  })
}

// 获取commit
export const getComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET',
  })
}

// 提交commit
export const submitComments = (slug, data) => {
  // console.log(body, 'body--')
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'POST',
    data,
  })
}

// 删除commit
export const deleteComments = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'DELETE',
  })
}
