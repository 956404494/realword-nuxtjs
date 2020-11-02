import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的用户文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    // Authorization: Token jwt.token.here
    // headers: {
    //   // 注意数据格式： Token空格数据Token
    //   // 通过容器或者Cookie获取token 使用axios请求拦截器 
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIxNzIxLCJ1c2VybmFtZSI6ImFubHkiLCJleHAiOjE2MDkwMzU2MDF9.bvpceMndR7j7f1hGF91ZpQagmoQyh2Q5jRGox04tgIA`
    // },
    params
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComment = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发表文章评论
export const addComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除文章评论
export const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 更新文章
export const updateArticle = (data, slug) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 发布文章
export const createArticle = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}