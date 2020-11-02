/**
 * Nuxt.js 配置文件
 */

 module.exports = {
   router: {
     // 设置导航栏路由高亮
     linkActiveClass: 'active',
     // 自定义路由规则
     extendRoutes (routes, resolve) {
      //  console.log(routes);
       // 清空 Nuxt.js 基于pages目录默认生成的路由表规则
       routes.splice(0)
      // 自定义路由表
       routes.push(...[
         {
           path: '/',
           component: resolve(__dirname, 'pages/layout/'),
           children: [
             {
               path: '', //默认子路由
               name: 'home',
               component: resolve(__dirname, 'pages/home/')
             },
             {
              path: '/login', 
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
             },
             {
              path: '/register', 
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
             },
             {
              path: '/profile/:username', 
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
             },
             {
              path: '/settings', 
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
             },
             {
              path: '/editor/:slug?', 
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
             },
             {
              path: '/article/:slug', 
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
             },
           ]
         }
       ])
     }
   },
   server: {
    // localhost 外部无法访问 
    // 生产服务器0.0.0.0监听所有网卡服务器  若是本地则是局域网可以访问
    host: '0.0.0.0',
    port: 3000
   },
   // 注册插件
   plugins: [
     '~/plugins/request.js',
     '~plugins/dayjs.js'
   ]
 }