import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		name: 'menu',
		path: '/menu',
		component: () => import('@/views/menu/index.vue'),
		//children: [{
		//		name: 'home',
		//		path: '/home',
		//		component: () => import('@/views/home/index.vue')
		//	},
		//	{
		//		name: 'set',
		//		path: '/set',
		//		component: () => import('@/views/set/index.vue')
		//	},
		//	{
		//		name: 'overview',
		//		path: '/overview',
		//		component: () => import('@/views/overview/index.vue')
		//	},
		//	{
		//		name: 'product_manage',
		//		path: '/product_manage',
		//		component: () => import('@/views/user_manage/product_manage/index.vue')
		//	},
		//	{
		//		name: 'message_manage',
		//		path: '/message_manage',
		//		component: () => import('@/views/user_manage/message_manage/index.vue')
		//	},
		//	{
		//		name: 'user_list',
		//		path: '/user_list',
		//		component: () => import('@/views/user_manage/user_list/index.vue')
		//	},
		//	{
		//		name: 'users_manage',
		//		path: '/users_manage',
		//		component: () => import('@/views/user_manage/users_manage/index.vue')
		//	},
		//	{
		//		name: 'product_management',
		//		path: '/product_management',
		//		component: () => import('@/views/product/Product_Management/index.vue')
		//	},
		//	{
		//		name: 'OutproductManagelist',
		//		path: '/OutproductManagelist',
		//		component: () => import('@/views/product/OutproductManage/index.vue')
		//	},
		//	{
		//		name: 'message_list',
		//		path: '/message_list',
		//		component: () => import('@/views/message/message_list/index.vue')
		//	},
		//	{
		//		name: 'recycle',
		//		path: '/recycle',
		//		component: () => import('@/views/message/recycle/index.vue')
		//	},
		//	{
		//		name: 'file',
		//		path: '/file',
		//		component: () => import('@/views/file/index.vue')
		//	},
		//	{
		//		name: 'login_log',
		//		path: '/login_log',
		//		component: () => import('@/views/login_log/index.vue')
		//	},
		//	{
		//		name: 'operation_log',
		//		path: '/operation_log',
		//		component: () => import('@/views/operation_log/index.vue')
		//	},
		//]
	},
  	{
    	name: '404',
    	path: '/:catchAll(.*)',
    	component: () => import('@/views/error/index.vue')
  	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router