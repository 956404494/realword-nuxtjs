const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // 作用：初始化容器以及需要传递给客户端的数据
  // nuxtServerInit是特殊的action 只会在服务端渲染期间运行
  nuxtServerInit ({commit}, {req}) {
    let user = null
    // 如果请求头中有Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      // 测试格式是否正确
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    // 提交mutation，修改state状态
    commit('setUser', user)
  }
}