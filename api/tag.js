import { request } from '@/plugins/request'

// 文章
export const getTags = () => {
  return request({
    url: '/api/tags',
    method: 'GET',
  })
}
