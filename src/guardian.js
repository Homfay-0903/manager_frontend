import router from './router'


// 全局前置守卫
router.beforeEach( (to, from, next) => {
  // const menuStore = useMenu()
  const token =localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else next()
})

//router.beforeEach((to, from, next) => {
//  const token = localStorage.getItem('token')
//  const isLoginPage = to.name === 'login'
//  
//  if (!token && !isLoginPage) {
//    // 未登录且访问非登录页 → 跳转登录
//    next({ name: 'login' })
//  } else if (token && isLoginPage) {
//    // 已登录且访问登录页 → 跳转首页
//    //next({ name: 'home' })
//  } else {
//    // 其他情况正常放行
//    next()
//  }
//})
//