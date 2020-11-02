/**
 * 验证是否登录的中间件
 * 用法 在保护页面设置中间件属性
 */
export default function ({ store, redirect }) {
  // if the user is authenticated redirect to home page
  if (store.state.user) {
    return redirect('/')
  }
}