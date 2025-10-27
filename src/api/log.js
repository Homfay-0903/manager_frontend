import instance from '@/http/index.js'

// 登录记录
export const loginLog = (account,name,email) => {
	return instance({
		url: '/login_log/loginLog',
		method: 'POST',
		data: {
			account,name,email
		}
	})
}

// 操作记录
export const operationLog = (operation_person,operation_content,operation_level) => {
	return instance({
		url: '/operation_log/operationLog',
		method: 'POST',
		data: {
			operation_person,operation_content,operation_level
		}
	})
}

// 返回登录日志列表
export const loginLogList = () => {
	return instance({
		url: '/login_log/loginLogList',
		method: 'POST',
	})
}

// 返回操作日志列表
export const operationLogList = () => {
	return instance({
		url: '/operation_log/operationLogList',
		method: 'POST',
	})
}

// 返回最近十条登录日志
export const searchLoginLogList = (account) => {
	return instance({
		url: '/login_log/searchLoginLogList',
		method: 'POST',
		data: {
			account
		}
	})
}

// 返回最近十条操作日志
export const searchOperationLogList = (operation_person) => {
	return instance({
		url: '/operation_log/searchOperationLogList',
		method: 'POST',
		data: {
			operation_person
		}
	})
}


// 返回登录日志列表的长度
export const loginLogListLength = () => {
	return instance({
		url: '/login_log/loginLogListLength',
		method: 'POST',
	})
}

// 返回操作日志列表的长度
export const operationLogListLength = () => {
	return instance({
		url: '/operation_log/operationLogListLength',
		method: 'POST',
	})
}

// 监听换页返回数据
export const returnLoginListData = (pager) => {
	return instance({
		url: '/login_log/returnLoginListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

export const returnOperationListData = (pager) => {
	return instance({
		url: '/operation_log/returnOperationListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 清空登录日志
export const clearLoginLogList = () => {
	return instance({
		url: '/login_log/clearLoginLogList',
		method: 'POST',
	})
}

// 清空操作日志
export const clearOperationLogList = () => {
	return instance({
		url: '/operation_log/clearOperationLogList',
		method: 'POST',
	})
}